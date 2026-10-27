import type { Settings } from '@contentauth/c2pa-web'
import type { Manifest as C2paManifest, ManifestStore, StatusCodes, ValidationStatus } from '@contentauth/c2pa-types'
import { TRUST_KEYS } from '#constants/data'
import { CAWG_IDENTITY_LABEL, TRUST_LIST_FETCH_TIMEOUT, TRUST_LIST_SCOPES, TRUST_LIST_REQUESTS_KEY, TRUST_LIST_SOURCES, TRUST_LIST_TYPES, TRUSTED_CODES, UNTRUSTED_CODES } from '#constants/trust'
import type { ManifestSignatureTrustValue, ManifestTrust, TrustListScope, TrustListSettings, TrustListSource, TrustListType } from '#types/trust'

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
	return Object.fromEntries(entries)
}

/**
 * Gets a manifest's trust from its validation status codes
 * @function
 * @param manifest - C2paManifest entry
 * @param validation - Validation status codes of the manifest
 * @param legacyValidation - Validation status codes of the manifest with legacy trust lists
 * @return Manifest trust
 */
export const getManifestTrust = (
	manifest: C2paManifest,
	validation: Pick<StatusCodes, 'success' | 'failure'> | null,
	legacyValidation: Pick<StatusCodes, 'success' | 'failure'> | null = null
): ManifestTrust => {
	if(!validation) return { value: TRUST_KEYS.UNKNOWN, identity: null }
	const hasSuccess = (codes: Pick<StatusCodes, 'success'> | null, code: string) =>
		Boolean(codes?.success.some(status => status.code === code))
	const getValue = (codes: Pick<StatusCodes, 'success' | 'failure'>) =>
		codes.failure.some(({ code }) => !UNTRUSTED_CODES.includes(code)) ? TRUST_KEYS.INVALID
		: hasSuccess(codes, TRUSTED_CODES.CLAIM) ? TRUST_KEYS.TRUSTED
		: TRUST_KEYS.VALID
	// The legacy read has more trust lists, so it decides anything the first read didn't trust
	const value = getValue(validation)
	const legacyValue = value !== TRUST_KEYS.TRUSTED && legacyValidation ? getValue(legacyValidation) : null
	const hasIdentity = manifest.assertions?.some(({ label }) => label.startsWith(CAWG_IDENTITY_LABEL))
	const identity: ManifestSignatureTrustValue =
		hasSuccess(validation, TRUSTED_CODES.IDENTITY) ? TRUST_KEYS.TRUSTED
		: hasSuccess(legacyValidation, TRUSTED_CODES.IDENTITY) ? TRUST_KEYS.TRUSTED_LEGACY
		: TRUST_KEYS.VALID
	return {
		value: legacyValue === TRUST_KEYS.TRUSTED ? TRUST_KEYS.TRUSTED_LEGACY : legacyValue ?? value,
		identity: hasIdentity ? identity : null,
	}
}

/**
 * Gets a manifest's validation status codes from a manifest store
 *
 * An ingredient's results are those recorded when it was added, plus what this validation found
 * differently, as described in https://spec.c2pa.org/specifications/specifications/2.4/specs/C2PA_Specification.html#_performing_recursive_validation
 * @function
 * @param manifest - C2paManifest entry
 * @param manifestStore - C2PA manifest store
 * @return Validation status codes
 */
export const getManifestValidation = (manifest: C2paManifest, manifestStore: ManifestStore | null | undefined): StatusCodes | null => {
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
 *
 * Ingredient results only list what changed since the ingredient was added, so an ingredient
 * that isn't trusted has no trusted claim code rather than an untrusted one
 * @function
 * @param manifestStore - C2PA manifest store
 * @return Whether the manifest store is fully trusted
 */
export const isFullyTrusted = (manifestStore: ManifestStore): boolean => {
	if(manifestStore.validation_state !== 'Trusted') return false
	return Object.values(manifestStore.manifests ?? {}).every(manifest => {
		const validation = getManifestValidation(manifest, manifestStore)
		if(!validation) return true
		const isClaimTrusted = validation.success.some(({ code }) => code === TRUSTED_CODES.CLAIM)
		const hasUntrusted = validation.failure.some(({ code }) => UNTRUSTED_CODES.includes(code))
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
