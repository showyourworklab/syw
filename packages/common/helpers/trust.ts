import type { Settings } from '@contentauth/c2pa-web'
import type { Manifest as C2paManifest, ManifestStore, StatusCodes, ValidationStatus } from '@contentauth/c2pa-types'
import { DETAIL_TRUST_KEYS, DETAIL_TRUST_ORDER, INTEGRITY_KEYS, TRUST_KEYS } from '#constants/data'
import { TRUST_LIST_FETCH_TIMEOUT, TRUST_LIST_SCOPES, TRUST_LIST_REQUESTS_KEY, TRUST_LIST_SOURCES, TRUST_LIST_TYPES, EXPIRED_CODES, TIMESTAMP_CODES, TRUSTED_CODES, UNTRUSTED_CODES } from '#constants/trust'
import type { ManifestValidation, TrustListScope, TrustListSettings, TrustListSource, TrustListType } from '#types/trust'
import type { DetailTrust, DetailTrustKey } from '#types/data'

/**
 * Gets the page-wide map of trust list requests
 * @function
 * @return Map of trust list URL to pending or settled request
 */
const getTrustListRequests = (): Map<string, Promise<string>> => {
	const scope = globalThis as typeof globalThis & { [TRUST_LIST_REQUESTS_KEY]?: Map<string, Promise<string>> }
	return scope[TRUST_LIST_REQUESTS_KEY] ??= new Map()
}

/**
 * Fetches a remote trust list
 * @async
 * @param url - Trust list URL
 * @param type - Trust list type
 * @return Cleaned trust list contents, empty if the list has no certificates or OIDs
 * @throws If the request fails or times out
 */
export const fetchTrustListContents = async (url: string, type: TrustListType): Promise<string> => {
	const response = await fetch(url, { signal: AbortSignal.timeout(TRUST_LIST_FETCH_TIMEOUT) })
	if(!response.ok) throw new Error(`${response.status} ${url}`)
	return cleanTrustList(await response.text(), type)
}

/**
 * Fetches a remote trust list once per page, falling back to the bundled copy
 * @async
 * @param url - Trust list URL
 * @param type - Trust list type
 * @param fallback - Bundled trust list contents
 * @return Trust list contents
 */
export const fetchTrustList = (url: string, type: TrustListType, fallback: string): Promise<string> => {
	const requests = getTrustListRequests()
	let request = requests.get(url)
	if(!request) {
		request = fetchTrustListContents(url, type)
			.then(contents => contents || fallback)
			.catch(() => fallback)
		requests.set(url, request)
	}
	return request
}

/**
 * Gets a trust list from its remote source, or its bundled copy if it has none
 * @async
 * @param source - Trust list source
 * @return Trust list contents
 */
export const getTrustList = (source: TrustListSource): Promise<string> => {
	return source.url ? fetchTrustList(source.url, source.type, source.fallback) : Promise.resolve(source.fallback)
}

/**
 * Gets the joined contents of every trust list of a scope and type
 * @async
 * @param scope - Trust list scope
 * @param type - Trust list type
 * @param legacy - Whether to get legacy trust lists instead of the others
 * @return Joined trust list contents
 */
export const getTrustListsByType = async (scope: TrustListScope, type: TrustListType, legacy = false): Promise<string> => {
	const sources = (Object.values(TRUST_LIST_SOURCES) as TrustListSource[])
		.filter(source => source.scopes.includes(scope) && source.type === type && Boolean(source.legacy) === legacy)
	const lists = await Promise.all(sources.map(getTrustList))
	return joinTrustLists(lists, type)
}

/**
 * Gets trust settings of a scope, only fetching lists that are not overridden
 * @async
 * @param scope - Trust list scope
 * @param overrides - Custom trust anchors, user anchors, allowed list and trust config (EKUs)
 * @return Trust anchors, user anchors, allowed list and trust config, omitting any that are empty
 */
export const getTrustListSettings = async (scope: TrustListScope, overrides: TrustListSettings = {}): Promise<TrustListSettings> => {
	const entries = await Promise.all(Object.values(TRUST_LIST_TYPES).map(async type =>
		[type, overrides[type] || await getTrustListsByType(scope, type)] as const
	))
	return Object.fromEntries(entries.filter(([, value]) => value.length > 0))
}

/**
 * Gets settings that add the legacy trust lists, to be merged over the C2PA instance's settings
 * @async
 * @return Settings for a legacy trust read
 */
export const getLegacyTrustSettings = async (): Promise<Settings> => {
	const entries = await Promise.all(Object.values(TRUST_LIST_SCOPES).map(async scope => {
		const lists = await Promise.all(Object.values(TRUST_LIST_TYPES).map(async type =>
			[type, await getTrustListsByType(scope, type, true)] as const
		))
		return [scope, Object.fromEntries(lists.filter(([, value]) => value.length > 0))] as const
	}))
	// Leave out scopes without legacy lists, like CAWG, so they keep the C2PA instance's settings
	return Object.fromEntries(entries.filter(([, value]) => Object.keys(value).length > 0))
}

/**
 * Gets a manifest's validation from its status codes
 * @function
 * @param statusCodes - Status codes of the manifest
 * @param legacyStatusCodes - Status codes of the manifest with legacy trust lists
 * @return Manifest validation
 */
export const getManifestValidation = (
	statusCodes: Pick<StatusCodes, 'success' | 'failure'> | null,
	legacyStatusCodes: Pick<StatusCodes, 'success' | 'failure'> | null = null
): ManifestValidation => {
	if(!statusCodes) return { integrity: INTEGRITY_KEYS.UNAVAILABLE, signer: null }
	// An untrusted signer doesn't change whether the details match what was signed
	const isInvalid = statusCodes.failure.some(({ code }) => !UNTRUSTED_CODES.includes(code))
	// Nothing about an invalid manifest is shown, including who signed it
	if(isInvalid) return { integrity: INTEGRITY_KEYS.INVALID, signer: null }
	return {
		integrity: INTEGRITY_KEYS.VALID,
		// An expired certificate can't be trusted, even if it's on a trust list
		signer: statusCodes.failure.some(({ code }) => code === EXPIRED_CODES.CLAIM)
			? TRUST_KEYS.UNTRUSTED_EXPIRED
			: getTrust(TRUSTED_CODES.CLAIM, statusCodes, legacyStatusCodes),
	}
}

/**
 * Gets how far a certificate is trusted from its trusted status code
 * The legacy read has more trust lists, so it decides anything the first read didn't trust
 * @function
 * @param code - Status code of the trusted certificate (i.e. signingCredential.trusted)
 * @param statusCodes - Status codes of the manifest
 * @param legacyStatusCodes - Status codes of the manifest with legacy trust lists
 * @return Trust key
 */
export const getTrust = (
	code: string,
	statusCodes: Pick<StatusCodes, 'success'> | null,
	legacyStatusCodes: Pick<StatusCodes, 'success'> | null = null
): typeof TRUST_KEYS.TRUSTED | typeof TRUST_KEYS.TRUSTED_LEGACY | typeof TRUST_KEYS.UNTRUSTED => {
	const hasSuccess = (codes: Pick<StatusCodes, 'success'> | null) =>
		Boolean(codes?.success.some(status => status.code === code))
	return hasSuccess(statusCodes) ? TRUST_KEYS.TRUSTED
		: hasSuccess(legacyStatusCodes) ? TRUST_KEYS.TRUSTED_LEGACY
		: TRUST_KEYS.UNTRUSTED
}

/**
 * Checks if a manifest's details still match what was signed, which is the only case its details are shown
 * @function
 * @param validation - Manifest validation
 * @return True if valid
 */
export const isManifestValid = (validation: ManifestValidation | null | undefined): boolean =>
	validation?.integrity === INTEGRITY_KEYS.VALID

/**
 * Gets the source of a manifest's signing time from its time-stamp status codes
 * @function
 * @param statusCodes - Status codes of the manifest
 * @param legacyStatusCodes - Status codes of the manifest with legacy trust lists
 * @return Trust key, or null when the signature has no time-stamp or it failed validation
 */
export const getSignedTimestampSource = (
	statusCodes: StatusCodes | null,
	legacyStatusCodes: StatusCodes | null = null
): DetailTrustKey | null => {
	const hasCode = (codes: StatusCodes | null, code: string) => Boolean(
		codes && [
			...codes.success,
			...codes.informational,
			...codes.failure
		].some(status =>
			status.code === code
		)
	)
	const isInvalid = statusCodes?.failure.some(({ code }) =>
		TIMESTAMP_CODES.INVALID.includes(code)
	)
	if(!statusCodes || isInvalid) {
		return null
	} else if(hasCode(statusCodes, TIMESTAMP_CODES.TRUSTED)) {
		return DETAIL_TRUST_KEYS.TRUSTED
	} else if(hasCode(legacyStatusCodes, TIMESTAMP_CODES.TRUSTED)) {
		return DETAIL_TRUST_KEYS.TRUSTED_LEGACY
	} else if(hasCode(statusCodes, TIMESTAMP_CODES.UNTRUSTED)) {
		return DETAIL_TRUST_KEYS.UNTRUSTED
	} else {
		return null
	}
}

/**
 * Gets the least trusted of several detail trusts, for a detail combined from several assertions
 * @function
 * @param trusts - Detail trusts
 * @return Least trusted detail trust, or null when there are none
 */
export const getWeakestTrust = (trusts: DetailTrust[]): DetailTrust | null =>
	trusts.reduce<DetailTrust | null>((weakest, trust) =>
		!weakest || DETAIL_TRUST_ORDER.indexOf(trust.level) > DETAIL_TRUST_ORDER.indexOf(weakest.level)
			? trust
			: weakest
	, null)

/**
 * Gets a manifest's status codes from a manifest store
 *
 * An ingredient's results are those recorded when it was added, plus what this validation found differently, as described in https://spec.c2pa.org/specifications/specifications/2.4/specs/C2PA_Specification.html#_performing_recursive_validation
 * @function
 * @param manifest - C2paManifest entry
 * @param manifestStore - C2PA manifest store
 * @return Status codes
 */
export const getManifestStatusCodes = (manifest: C2paManifest, manifestStore: ManifestStore | null | undefined): StatusCodes | null => {
	const { validation_results, active_manifest, manifests } = manifestStore ?? {}
	if(!manifest.label) return null
	if(manifest.label === active_manifest) return validation_results?.activeManifest ?? null
	for(const [parentLabel, parent] of Object.entries(manifests ?? {})) {
		const ingredient = parent.ingredients?.find(({ active_manifest }) => active_manifest === manifest.label)
		if(!ingredient) continue
		const recorded = ingredient.validation_results?.activeManifest ?? null
		const deltas = validation_results?.ingredientDeltas?.find(({ ingredientAssertionURI }) =>
			ingredientAssertionURI.endsWith(`${parentLabel}/c2pa.assertions/${ingredient.label}`)
		)?.validationDeltas ?? null
		return recorded && deltas ? mergeStatusCodes(recorded, deltas) : recorded ?? deltas
	}
	return null
}

/**
 * Merges recorded status codes with deltas, where a delta replaces recorded codes of the same check and URL
 * @function
 * @param recorded - Status codes recorded when the ingredient was added
 * @param deltas - Status codes this validation found differently
 * @return Merged status codes
 */
const mergeStatusCodes = (recorded: StatusCodes, deltas: StatusCodes): StatusCodes => {
	// e.g. `signingCredential.trusted` and `signingCredential.untrusted` are the same check
	const getCheck = ({ code, url }: ValidationStatus) => `${code.slice(0, code.lastIndexOf('.'))} ${url ?? ''}`
	const checks = new Set([...deltas.success, ...deltas.informational, ...deltas.failure].map(getCheck))
	const keep = (statuses: ValidationStatus[]) => statuses.filter(status => !checks.has(getCheck(status)))
	return {
		success: [...deltas.success, ...keep(recorded.success)],
		informational: [...deltas.informational, ...keep(recorded.informational)],
		failure: [...deltas.failure, ...keep(recorded.failure)],
	}
}

/**
 * Checks if every signature in a manifest store is trusted, so legacy trust lists don't need checking
 * Ingredient results only list what changed since the ingredient was added, so an ingredient that isn't trusted has no trusted claim code rather than an untrusted one
 * @function
 * @param manifestStore - C2PA manifest store
 * @return Whether the manifest store is fully trusted
 */
export const isFullyTrusted = (manifestStore: ManifestStore): boolean => {
	if(manifestStore.validation_state !== 'Trusted') return false
	return Object.values(manifestStore.manifests ?? {}).every(manifest => {
		const statusCodes = getManifestStatusCodes(manifest, manifestStore)
		if(!statusCodes) return true
		const isClaimTrusted = statusCodes.success.some(({ code }) => code === TRUSTED_CODES.CLAIM)
		const hasUntrusted = statusCodes.failure.some(({ code }) => UNTRUSTED_CODES.includes(code))
		return isClaimTrusted && !hasUntrusted
	})
}

/**
 * Joins strings of PEM file contents
 * @function
 * @param pems - Array of raw string of PEM file contents
 * @returns Compined string of PEM file contents
 */
export const joinPem = (pems: string[]): string => {
	return pems.map(cleanPem).join("\n")
}

/**
 * Cleans string of PEM file contents
 * @function
 * @param pem - Raw string of PEM file contents
 * @returns Cleaned string of PEM file contents
 */
export const cleanPem = (pem: string): string => {
	const certs = pem.match(/-----BEGIN CERTIFICATE-----[\s\S]+?-----END CERTIFICATE-----/g);
	return certs ? certs.join("\n") : "";
}

/**
 * Cleans string of trust config (.cfg) file contents
 * @function
 * @param cfg - Raw string of .cfg file contents, with one OID per line and optional // comments
 * @returns Trimmed lines of OIDs and comments, empty if there are no OIDs
 */
export const cleanTrustConfig = (cfg: string): string => {
	const lines = cfg.split(/\r?\n/).map(line => line.trim()).filter(Boolean)
	return lines.some(line => /^\d+(\.\d+)+$/.test(line)) ? lines.join("\n") : "";
}

/**
 * Cleans trust list contents according to its type
 * @function
 * @param contents - Raw trust list contents
 * @param type - Trust list type
 * @returns Cleaned trust list contents
 */
export const cleanTrustList = (contents: string, type: TrustListType): string => {
	return type === TRUST_LIST_TYPES.TRUST_CONFIG ? cleanTrustConfig(contents) : cleanPem(contents)
}

/**
 * Joins trust lists of the same type
 * @function
 * @param lists - Raw trust list contents
 * @param type - Trust list type
 * @returns Joined trust list contents
 */
export const joinTrustLists = (lists: string[], type: TrustListType): string => {
	return lists.map(list => cleanTrustList(list, type)).filter(Boolean).join("\n")
}
