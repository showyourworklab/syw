import { createC2pa } from '@contentauth/c2pa-web'
import type { Reader, C2pa } from '@contentauth/c2pa-web'
import type { Manifest as C2paManifest, ManifestAssertion } from '@contentauth/c2pa-types'
import { VERIFY_BASE_URL } from '#constants/ui'
import { C2PA_ACTIONS } from '#constants/c2pa'
import { PHASE_KEYS, C2PA_DATA_DEFAULT, DETAIL_TRUST_KEYS, DETAIL_TRUST_SOURCES, KNOWN_GENERATORS_BY_MANIFEST_TYPE, MANIFEST_TYPES, MEDIA_TYPES, MEDIA_TYPE_EXTENSIONS_IMAGE, MEDIA_TYPE_EXTENSIONS_VIDEO } from '#constants/data'
import { convertJumbfToBlobUrl, fetchMedia, getC2paActions, getAssertion, getC2paConfig, getCawgIdentityValue, getExifValue, getManifestIptc, getMetadataAssertion, isAssertionAttributed, hasC2paAction, isAiEditedManifest, isEditedManifest, readC2paFromBlob, readLegacyManifestStore } from '#helpers/c2pa'
import { TRUSTED_CODES } from '#constants/trust'
import { getManifestStatusCodes, getManifestValidation, getSignedTimestampSource, getTrust, getWeakestTrust, isManifestValid } from '#helpers/trust'
import { getIptcDigitalSourceTypeKey, isIptcDigitalSourceTypeAi, isIptcDigitalSourceTypeCamera } from '#helpers/iptc'
import type {
	C2paOptions,
	C2paProvenance,
} from '#types/c2pa'
import type {
	SywData,
	MediaType,
	DetailTrust,
	ManifestAction,
	ManifestActions,
	ManifestGenerator,
	ManifestGeneratorEntry,
	ManifestIdentity,
	ManifestLocation,
	ManifestProducer,
	ManifestTimestamp,
	ManifestTimestampValue,
	ManifestType,
	ManifestTypeKey,
	Manifest,
	TrustKey,
} from '#types/data'
import type { ManifestValidation } from '#types/trust'
import type { DataEventType } from '#types/ui'

/////////////// Data ///////////////

/**
 * Prepares data from a media source with an existing C2PA instance
 * @async
 * @function
 * @param props - Object of props
 * @param props.c2pa - C2PA instance
 * @param props.src - Media URL
 * @param props.mediaType - Media type, detected from src, the fetched file's MIME type and the C2PA manifest's format when not given
 * @return Prepared data, or default data with media type when c2pa or src is missing
 */
export const prepareData = async ({ c2pa, src, mediaType: userMediaType }: {
	c2pa: C2pa | null | undefined
	src: string
	mediaType?: MediaType | null
}): Promise<SywData> => {
	// Take the user's media type as fact, otherwise detect it from src, the fetched file's MIME type and the C2PA manifest's format
	const isUserMediaType = !!userMediaType
	let mediaType = resolveMediaType(src, userMediaType)
    if(!c2pa || !src) return { ...C2PA_DATA_DEFAULT, mediaType }
	let data: SywData
    try {
		const { blob, mimeType } = await fetchMedia(src)
		const mimeMediaType = getMediaTypeFromMimeType(mimeType)
		if(!isUserMediaType) mediaType = resolveMediaType(src, mimeMediaType)
		const { manifestStore, reader } = await readC2paFromBlob(c2pa, blob, mimeType)
		const legacyManifestStore = await readLegacyManifestStore(c2pa, blob, mimeType, manifestStore)
		const activeManifest = manifestStore?.manifests?.[manifestStore.active_manifest ?? '']
		if(!isUserMediaType) mediaType = resolveMediaType(src, mimeMediaType, getMediaTypeFromMimeType(activeManifest?.format))
        const provenance = manifestStore ? { manifestStore, legacyManifestStore } : null
        const manifests = await prepareManifests({ provenance, reader })
        const types = getTypes(manifests)
        data = {
            phase: PHASE_KEYS.READY,
            types,
            // provenance,
			mediaType,
			manifests,
            reader: reader ?? null,
            error: null,
        }
    } catch (error) {
		console.error(error)
        data = {
            ...C2PA_DATA_DEFAULT,
            phase: PHASE_KEYS.ERROR,
			mediaType,
            error: error as Error,
        }
    }
	console.log(data)
	return data
}

let cachedC2pa: C2pa | null = null

/**
 * Public API for consumer apps to get the same prepared data the UI components use, outside of the UI components
 * Creates and caches its own C2PA instance on first call
 * @async
 * @function
 * @param src - Media URL
 * @param options - Optional overrides
 * @param options.locale - User's locale
 * @param options.c2paOptions - C2PA instance options, only used on first call
 * @param options.mediaType - Media type, detected from src when not given
 * @return Prepared data, or default data when src is empty or Web Workers are unavailable
 */
export const parseSywData = async (
	src: string,
	options: {
		locale?: string,
		c2paOptions?: C2paOptions,
		mediaType?: MediaType
	} = {}
): Promise<SywData> => {
	if(!src) return C2PA_DATA_DEFAULT
	if(typeof Worker === 'undefined') return C2PA_DATA_DEFAULT
	const { c2paOptions = {}, mediaType } = options
	if(!cachedC2pa) cachedC2pa = await createC2pa(await getC2paConfig(c2paOptions))
	const preparedData = prepareData({ c2pa: cachedC2pa, src, mediaType })
	return preparedData
}

export const getTypes = (manifests: Manifest[] | undefined): ManifestType[] =>
	manifests?.map(m => m?.type)?.filter((m): m is ManifestType => Boolean(m)) ?? []

/**
 * Checks if media data is loading, or is about to load because a src is set but reading hasn't started yet
 * @function
 * @param data - Media data
 * @return True if loading
 */
export const isDataLoading = ({ phase, src }: Pick<SywData, 'phase'> & { src?: string | null }): boolean =>
	phase === PHASE_KEYS.LOADING || (phase === PHASE_KEYS.IDLE && !!src)

/**
 * Gets the event type to fire for a media data phase
 * @function
 * @param data - Media data
 * @return Event type, or null when idle
 */
export const getDataEventType = ({ phase, manifests }: Pick<SywData, 'phase' | 'manifests'>): DataEventType | null => {
	if(phase === PHASE_KEYS.LOADING) return 'data.load'
	if(phase === PHASE_KEYS.ERROR) return 'data.error'
	if(phase === PHASE_KEYS.READY) return manifests?.length ? 'data.ready' : 'data.empty'
	return null
}

/**
 * Disposes of prepared data that is no longer needed
 * @function
 * @param data - Prepared data
 */
export const disposeSywData = (data: SywData | null | undefined) => {
	if(!data) return
	revokeManifestBlobUrls(data.manifests)
	data.reader?.free().catch(() => {})
}

/**
 * Revokes blob URLs of prepared manifests
 * @function
 * @param manifests - Prepared manifests
 */
export const revokeManifestBlobUrls = (manifests: Manifest[] | null | undefined) => {
	for(const manifest of manifests ?? []) {
		if(manifest.thumbnail) URL.revokeObjectURL(manifest.thumbnail)
		for(const generator of manifest.generator?.value ?? []) {
			if(generator.icon) URL.revokeObjectURL(generator.icon)
		}
	}
}

/////////////// Manifest Handling ///////////////

/**
 * Prepares a provenance object into sorted array of formatted manifests
 * @async
 * @function
 * @param props - Object of props
 * @param props.provenance - C2PA full provenance
 * @param props.reader - C2PA reader instance
 * @return Prepared manifest object
 */
export const prepareManifests = async ({ provenance, reader }: {
	provenance: C2paProvenance | null
	reader: Reader | null | undefined
}): Promise<Manifest[]> => {
	try {
        if(!provenance?.manifestStore) return []
        const manifests = Object.values(provenance.manifestStore.manifests ?? {})
        const preparedManifests = await Promise.all(
            manifests.map(manifest =>
				prepareManifest({ manifest, provenance, reader })
			)
        )
		preparedManifests.sort((a, b) =>
			(a?.timestamp?.value?.date?.getTime?.() || 0) - (b?.timestamp?.value?.date?.getTime?.() || 0)
		)
		// Timestamps of none manifests are only used for ordering, not shown
		for(const manifest of preparedManifests) {
			if(manifest.type?.key === MANIFEST_TYPES.NONE) manifest.timestamp = null
		}
		if(hasUnknownCreate(preparedManifests)) {
			preparedManifests.unshift(prepareUnknownCreateManifest())
		}
        return preparedManifests
    } catch (error) {
        console.error(error)
        return []
    }
}

/**
 * Prepares a manifest object with extracted and formatted data
 * @async
 * @function
 * @param props - Object of props
 * @param props.manifest - C2paManifest entry
 * @param props.reader - C2PA reader instance
 * @return Prepared manifest object
 */
export const prepareManifest = async ({ manifest, provenance, reader }: {
	manifest: C2paManifest
	provenance: C2paProvenance | null
	reader: Reader | null | undefined
}): Promise<Manifest> => {
	const validation = getValidation(manifest, provenance)
	if(!isManifestValid(validation)) {
		return prepareNoneManifest(manifest, validation, provenance)
	}
	return {
		id: getId(manifest),
		type: getType(manifest),
		validation,
		timestamp: getTimestamp(manifest, provenance, validation.signer),
		identity: getIdentity(manifest, provenance),
		producer: getProducer(manifest, validation.signer),
		signator: getSignator(manifest),
		generator: await getGenerator(manifest, reader, validation.signer),
		actions: getActions(manifest, validation.signer),
		// ingredients: getIngredients(manifest),
		thumbnail: await getThumbnail(manifest, reader),
		location: getLocation(manifest, validation.signer),
		original: manifest
	}
}

/**
 * Prepares a manifest object for a recorded step whose integrity isn't valid, leaving out its unverified claims
 * Keeps the timestamp only for ordering, which prepareManifests then clears
 * @function
 * @param manifest - C2paManifest entry
 * @param validation - Manifest validation
 * @return Prepared manifest object
 */
export const prepareNoneManifest = (manifest: C2paManifest, validation: ManifestValidation, provenance: C2paProvenance | null): Manifest => ({
	id: getId(manifest),
	type: { key: MANIFEST_TYPES.NONE },
	validation,
	timestamp: getTimestamp(manifest, provenance, validation.signer),
	identity: null,
	producer: null,
	generator: null,
	thumbnail: null,
	location: null,
	original: manifest,
})

/**
 * Prepares a manifest object representing an origin that wasn't recorded
 * @function
 * @return Prepared manifest object
 */
export const prepareUnknownCreateManifest = (): Manifest => ({
	id: MANIFEST_TYPES.UNKNOWN_CREATE,
	type: { key: MANIFEST_TYPES.UNKNOWN_CREATE },
	validation: null,
	timestamp: null,
	identity: null,
	producer: null,
	generator: null,
	thumbnail: null,
	location: null,
})

/////////////// Detail Trust ///////////////

/**
 * Gets how far a detail from the claim itself can be trusted, which is how far its signer is
 * @function
 * @param signer - Trust key of the claim signer
 * @return Detail trust
 */
export const getClaimTrust = (signer: TrustKey | null | undefined): DetailTrust =>
	signer
		? { level: signer, source: DETAIL_TRUST_SOURCES.SIGNER }
		: { level: DETAIL_TRUST_KEYS.REPORTED, source: DETAIL_TRUST_SOURCES.GATHERED }

/**
 * Gets how far a detail from an assertion can be trusted
 * Assertions attributed to the signer are as trusted as the signer, otherwise they were gathered and are only reported
 * @function
 * @param assertion - Assertion the detail came from
 * @param signer - Trust key of the claim signer
 * @return Detail trust
 */
export const getAssertionTrust = (
	assertion: ManifestAssertion | null | undefined,
	signer: TrustKey | null | undefined
): DetailTrust =>
	isAssertionAttributed(assertion)
		? getClaimTrust(signer)
		: { level: DETAIL_TRUST_KEYS.REPORTED, source: DETAIL_TRUST_SOURCES.GATHERED }

/////////////// Manifest Fields ///////////////

/**
 * Gets manifest ID
 * @function
 * @param data - C2paManifest entry
 * @return Instance ID
 */
export const getId = (data: C2paManifest | null | undefined) => data?.instance_id

/**
 * Gets manifest type
 * @function
 * @param manifest - C2paManifest entry
 * @return Manifest type
 */
export const getType = (manifest: C2paManifest | null | undefined): ManifestType | null => {
	const iptc = getManifestIptc(manifest)
	let typeKey: ManifestTypeKey = MANIFEST_TYPES.UNKNOWN
	if(isIptcDigitalSourceTypeCamera(iptc)) {
		typeKey = MANIFEST_TYPES.CAMERA
	} else if(isIptcDigitalSourceTypeAi(iptc)) {
		typeKey = isAiEditedManifest(manifest, iptc) ? MANIFEST_TYPES.AI_EDIT : MANIFEST_TYPES.AI_CREATE
	} else if(isEditedManifest(manifest)) {
		typeKey = MANIFEST_TYPES.EDIT
	} else {
		typeKey = getGeneratorTypeKey(manifest) ?? MANIFEST_TYPES.UNKNOWN
	}
	return {
		key: typeKey,
		iptc: iptc
	}
}

/**
 * Gets a manifest's validation
 * @function
 * @param manifest - C2paManifest entry
 * @param provenance - C2PA provenance
 * @return Manifest validation
 */
export const getValidation = (manifest: C2paManifest, provenance: C2paProvenance | null): ManifestValidation => {
	const statusCodes = getManifestStatusCodes(manifest, provenance?.manifestStore)
	const legacyStatusCodes = getManifestStatusCodes(manifest, provenance?.legacyManifestStore)
	return getManifestValidation(statusCodes, legacyStatusCodes)
}

/**
 * Gets a manifest's timestamp, preferring a time-stamp authority's signing time over a time reported by the device or app
 * @function
 * @param manifest - C2paManifest entry
 * @param provenance - C2PA provenance
 * @param signer - Trust key of the claim signer
 * @return Timestamp with its trust, or null when manifest has no usable time
 */
export const getTimestamp = (manifest: C2paManifest | null | undefined, provenance: C2paProvenance | null, signer: TrustKey | null | undefined): ManifestTimestamp | null => {
	if(!manifest) return null
	const statusCodes = getManifestStatusCodes(manifest, provenance?.manifestStore)
	const legacyStatusCodes = getManifestStatusCodes(manifest, provenance?.legacyManifestStore)
	const signedLevel = getSignedTimestampSource(statusCodes, legacyStatusCodes)
	const signedValue = signedLevel ? getIsoTimestampValue(manifest.signature_info?.time) : null
	if(signedLevel && signedValue) {
		return { value: signedValue, trust: { level: signedLevel, source: DETAIL_TRUST_SOURCES.TIMESTAMP } }
	}
	const exifValue = getExifTimestampValue(manifest)
	if(exifValue) {
		return { value: exifValue, trust: getAssertionTrust(getAssertion(manifest, 'stds.exif'), signer) }
	}
	const actionValue = getIsoTimestampValue(getC2paActions(manifest)?.find(action => action?.when)?.when)
	return actionValue
		? { value: actionValue, trust: getAssertionTrust(getAssertion(manifest, 'c2pa.actions', true), signer) }
		: null
}

/**
 * Gets a timestamp value from an ISO date string
 * @function
 * @param isoString - ISO date string
 * @return Timestamp value, or null when not a valid date
 */
export const getIsoTimestampValue = (isoString: string | null | undefined): ManifestTimestampValue | null => {
	if(!isoString) return null
	const offsetMatch = isoString.match(/([+-]\d{2}:\d{2})$|Z$/)
	const date = new Date(isoString)
	const offset = !offsetMatch || offsetMatch[0] === 'Z' ? '+00:00' : offsetMatch[0]
	return isFinite(date.getTime()) ? { date, offset } : null
}

/**
 * Gets a timestamp value from a manifest's EXIF capture time
 * @function
 * @param manifest - C2paManifest entry
 * @return Timestamp value, or null when manifest has no valid EXIF capture time
 */
export const getExifTimestampValue = (manifest: C2paManifest | null | undefined): ManifestTimestampValue | null => {
	const exifDateTime = getExifValue(manifest, 'DateTimeOriginal') as string | undefined
	const exifParsedDate = exifDateTime?.split(/\D/)
	if(exifParsedDate?.length !== 6) return null
	const exifOffset = getExifValue(manifest, 'OffsetTimeOriginal') as string ?? null
	const [year, month, day, hour, minute, second] = exifParsedDate
	const date = exifOffset
		? new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}${exifOffset}`)
		: new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute), Number(second))
	return isFinite(date.getTime()) ? { date, offset: exifOffset } : null
}

/**
 * Gets a manifest's CAWG identity and how far its certificate is trusted
 * @function
 * @param manifest - C2paManifest entry
 * @param provenance - C2PA provenance
 * @return Identity, or null when manifest has no CAWG identity
 */
export const getIdentity = (manifest: C2paManifest | null | undefined, provenance: C2paProvenance | null): ManifestIdentity | null => {
	const value = getCawgIdentityValue(manifest)
	if(!manifest || !value) return null
	const statusCodes = getManifestStatusCodes(manifest, provenance?.manifestStore)
	const legacyStatusCodes = getManifestStatusCodes(manifest, provenance?.legacyManifestStore)
	return {
		value,
		trust: {
			level: getTrust(TRUSTED_CODES.IDENTITY, statusCodes, legacyStatusCodes),
			source: DETAIL_TRUST_SOURCES.IDENTITY,
		},
	}
}

/**
 * Gets the names a manifest gives as its creators, from schema.org, Dublin Core and EXIF metadata
 * Names can come from several assertions, so the least trusted of them decides the trust
 * @function
 * @param manifest - C2paManifest entry
 * @param signer - Trust key of the claim signer
 * @return Producer names, or null when manifest names no creator
 */
export const getProducer = (manifest: C2paManifest | null | undefined, signer: TrustKey | null | undefined): ManifestProducer | null => {
	const toNames = (value: unknown): unknown[] =>
		Array.isArray(value) ? value
		// JSON-LD lists may be wrapped (i.e. { "@list": [...] })
		: (value as { '@list'?: unknown[] } | null)?.['@list'] ?? [value]
	const toCleanNames = (names: unknown[]): string[] => names
		.filter((name): name is string => typeof name === 'string')
		.map(name => name.trim())
		.filter(Boolean)
	const schemaOrgAssertion = getAssertion(manifest, 'stds.schema-org', true)
	const metadataAssertion = getMetadataAssertion(manifest, 'dc:creator')
	const exifAssertion = getAssertion(manifest, 'stds.exif')
	const schemaOrgData = schemaOrgAssertion?.data as Record<string, unknown> | undefined
	const metadataData = metadataAssertion?.data as Record<string, unknown> | undefined
	const exifData = exifAssertion?.data as Record<string, unknown> | undefined
	const entries = [
		{
			assertion: schemaOrgAssertion,
			names: toNames(schemaOrgData?.author).map(author =>
				typeof author === 'string' ? author : (author as { name?: string } | null)?.name
			),
		},
		{
			assertion: metadataAssertion,
			names: toNames(metadataData?.['dc:creator']),
		},
		{
			assertion: exifAssertion,
			names: [exifData?.['exif:Artist'], exifData?.['tiff:Artist']],
		},
	]
		.map(entry => ({ ...entry, names: toCleanNames(entry.names) }))
		.filter(entry => entry.names.length)
	const value = [...new Set(entries.flatMap(entry => entry.names))]
	const trust = getWeakestTrust(entries.map(entry => getAssertionTrust(entry.assertion, signer)))
	return value.length && trust ? { value, trust } : null
}

/**
 * Gets a manifest's signature issuer
 * @function
 * @param manifest - C2paManifest entry
 * @return Signature issuer name
 */
export const getSignator = (manifest: C2paManifest | null | undefined) =>
	manifest?.signature_info?.issuer

/**
 * Gets a manifest's description of claim generator
 * @async
 * @function
 * @param manifest - C2paManifest entry
 * @param reader - C2PA reader instance
 * @return List of generator names with version (i.e. Lightroom Classic 14.0) and icon URL
 */
export const getGenerator = async (
	manifest: C2paManifest | null | undefined,
	reader: Reader | null | undefined,
	signer: TrustKey | null | undefined
): Promise<ManifestGenerator | null> => {
	let value: ManifestGeneratorEntry[] = []
	// Claim generator info is part of the claim, so it's as trusted as the signer
	let trust = getClaimTrust(signer)
	if(manifest?.claim_generator_info) {
		value = await Promise.all(manifest.claim_generator_info.map(async d => {
			const icon = d?.icon as { identifier?: string, format?: string } | null | undefined
			return {
				name: d.name,
				// detail: d.version,
				icon: await convertJumbfToBlobUrl(reader, icon?.identifier, icon?.format),
			}
		}))
	} else if(getExifValue(manifest, 'Make') || getExifValue(manifest, 'Model')) {
		const exifModel = getExifValue(manifest, 'Model')
		value = [{
			name: exifModel as string,
			// detail: exifMake,
		}]
		trust = getAssertionTrust(getAssertion(manifest, 'stds.exif'), signer)
	} else if(manifest?.claim_generator) {
		value = [{
			name: manifest?.claim_generator
		}]
	}
	return value.length ? { value, trust } : null
}

/**
 * Gets a manifest's action keys
 * @function
 * @param manifest - C2paManifest entry
 * @return Array of action keys
 */
export const getActions = (manifest: C2paManifest | null | undefined, signer: TrustKey | null | undefined): ManifestActions | null => {
	const c2paActions = getC2paActions(manifest)
		?.map(action => {
			const actionKey = action.action?.replace(".", "_")
			const iptcDigitalSourceType = getIptcDigitalSourceTypeKey(action?.digitalSourceType)
			return {
				key: actionKey,
				iptc: iptcDigitalSourceType,
			}
		})
		?.reduce((arr: ManifestAction[], val) =>
			!arr.some(v =>
				v.key === val.key && v.iptc === val.iptc
			)
				? [...arr, val]
				: arr
		, [])
	return c2paActions?.length
		? { value: c2paActions, trust: getAssertionTrust(getAssertion(manifest, 'c2pa.actions', true), signer) }
		: null
}

/**
 * Gets a manifest's ingredients
 * @function
 * @param manifest - C2paManifest entry
 * @return Array of ingredients
 */
export const getIngredients = (manifest: C2paManifest | null | undefined): unknown[] => {
	return []
}

/**
 * Gets a manifest's thumbnail blob URL
 * @function
 * @param manifest - C2paManifest entry
 * @param reader - C2PA reader instance
 * @return Thumbnail URL
 */
export const getThumbnail = async (manifest: C2paManifest | null | undefined, reader: Reader | null | undefined): Promise<string | null> => {
	const thumbnail = manifest?.thumbnail
	return await convertJumbfToBlobUrl(reader, thumbnail?.identifier, thumbnail?.format)
}

/**
 * Gets a manifest's latitude and longitude
 * @function
 * @param manifest - C2paManifest entry
 * @return Object of latitude (lat) and longitude (lng)
 */
export const getLocation = (manifest: C2paManifest | null | undefined, signer: TrustKey | null | undefined): ManifestLocation | null => {
	// Test coordinates
	// return { lat: 40.754544782093724, lng: -73.91208171708277 }
	const exifLat = getExifValue(manifest, 'GPSLatitude') as string
	const exifLatDir = getExifValue(manifest, 'GPSLatitudeRef') as string
	const lat = isNaN(exifLat as unknown as number)
		? convertDmsToDd(exifLat, exifLatDir)
		: parseFloat(exifLat)
	const exifLng = getExifValue(manifest, 'GPSLongitude') as string
	const exifLngDir = getExifValue(manifest, 'GPSLongitudeRef') as string
	const lng = isNaN(exifLng as unknown as number)
		? convertDmsToDd(exifLng, exifLngDir)
		: parseFloat(exifLng)
	if(lat === undefined || lng === undefined || isNaN(lat) || isNaN(lng)) return null
	return { value: { lat, lng }, trust: getAssertionTrust(getAssertion(manifest, 'stds.exif'), signer) }
}

/////////////// Media Types ///////////////

/**
 * Get media type from a MIME type
 * @function
 * @param mimeType - MIME type (i.e. image/jpeg)
 * @returns Returns "image", "video" or null when it's neither
 */
export const getMediaTypeFromMimeType = (mimeType: string | null | undefined): MediaType | null => {
	const prefix = mimeType?.split('/')[0]?.trim().toLowerCase()
	if(prefix === MEDIA_TYPES.IMAGE) return MEDIA_TYPES.IMAGE
	if(prefix === MEDIA_TYPES.VIDEO) return MEDIA_TYPES.VIDEO
	return null
}

/**
 * Guess media type of src without fetching it
 * Use the MIME type of the fetched file (see getMediaTypeFromMimeType) when available
 * @function
 * @param src - String of media source
 * @returns Returns "image", "video" or null when src doesn't say
 */
export const getMediaType = (src: string | null | undefined): MediaType | null => {
	if(!src) return null
	// Data URLs include their MIME type (i.e. data:image/png;base64,...)
	if(src.startsWith('data:')) {
		return getMediaTypeFromMimeType(src.slice(5).split(/[;,]/)[0])
	}
	// Ignore query strings and hashes (i.e. photo.jpg?w=800)
	const path = src.split(/[?#]/)[0]
	const extension = path.split('/').pop()?.split('.').pop()?.toLowerCase()
	if(extension && MEDIA_TYPE_EXTENSIONS_IMAGE.includes(extension)) return MEDIA_TYPES.IMAGE
	if(extension && MEDIA_TYPE_EXTENSIONS_VIDEO.includes(extension)) return MEDIA_TYPES.VIDEO
	return null
}

/**
 * Resolve media type from the first known source, then from src
 * Falls back to "image", since anything that isn't a video is rendered in an image tag
 * @function
 * @param src - String of media source
 * @param mediaTypes - Media types in order of trust (i.e. user provided, fetched MIME type, C2PA manifest format)
 * @returns Returns "image" or "video"
 */
export const resolveMediaType = (src: string | null | undefined, ...mediaTypes: (MediaType | null | undefined)[]): MediaType =>
	mediaTypes.find(mediaType => !!mediaType) ?? getMediaType(src) ?? MEDIA_TYPES.IMAGE

/////////////// Utilities ///////////////

/**
 * Checks if the earliest manifest was opened from an asset with no recorded origin
 * @function
 * @param manifests - Prepared manifests, sorted by timestamp
 * @return Boolean
 */
export const hasUnknownCreate = (manifests: Manifest[]): boolean =>
	hasC2paAction(manifests[0]?.original, C2PA_ACTIONS.OPENED)
	&& !manifests.some(m => hasC2paAction(m.original, C2PA_ACTIONS.CREATED))

/**
 * Gets manifest's type key from known claim generators, then the signing certificate's common name, then its issuer
 * @function
 * @param data - C2paManifest entry
 * @return Manifest type key
 */
export const getGeneratorTypeKey = (data: C2paManifest | null | undefined): ManifestTypeKey | undefined => {
	const knownNames = Object.keys(KNOWN_GENERATORS_BY_MANIFEST_TYPE)
	// Cameras like Leica's sign with a certificate named after the model, even without claim generator info
	const names = [
		...(data?.claim_generator_info?.map(g => g?.name) ?? []),
		data?.signature_info?.common_name,
		// Some signers are only identifiable by the organization that issued the certificate (i.e. NIKON CORPORATION)
		data?.signature_info?.issuer,
	]
	const generatorName = names.find((name): name is string => Boolean(name) && knownNames.includes(name as string))
	return generatorName ? KNOWN_GENERATORS_BY_MANIFEST_TYPE[generatorName] : undefined
}

/**
 * Converts degrees minutes seconds (DMS) to decimal degrees (DD)
 * @function
 * @param dms - Degrees minutes seconds (DMS)
 * @param dir - Cardinal direction
 * @return Decimal degrees
 */
const convertDmsToDd = (dms: string | null | undefined, dir: string | null | undefined): number | undefined => {
	if(!dms || !dir) return
    const dmsParts = dms?.split(" ")
    const degrees = parseFloat(dmsParts[0])
    const minutes = parseFloat(dmsParts[1])
    const seconds = parseFloat(dmsParts[2])
    let decimalDegrees = degrees + (minutes / 60) + (seconds / 3600)
    if(dir == "S" || dir == "W") {
        decimalDegrees = decimalDegrees * -1
    }
    return decimalDegrees
}

/**
 * Gets URL to CAI Verify page with image URL as parameter
 * @function
 * @param src - Image URL
 * @return Verify site URL
 */
export const getVerifyUrl = (src: string) => `https://${VERIFY_BASE_URL}?source=${src}`