import { createC2pa } from '@contentauth/c2pa-web'
import type { Reader, C2pa, Config, Settings } from '@contentauth/c2pa-web'
import type { Manifest as C2paManifest, ManifestStore, Action } from '@contentauth/c2pa-types'
import { VERIFY_BASE_URL } from '#constants/index'
import { C2PA_PHASES, C2PA_DATA_DEFAULT, C2PA_MEDIA_TYPES, C2PA_TRUST_VALUES, C2PA_WEB_WASM_CDN_URL } from '#constants/c2pa'
import { convertJumbfToBlobUrl, getMediaType, getMediaTypeFromMimeType, isKnownMediaType, resolveMediaType, revokeManifestBlobUrls } from '#helpers/index'
import { getLegacyTrustSettings, getManifestTrust, getManifestValidation, getTrustListSettings, isFullyTrusted } from '#helpers/trust'
import { TRUST_LIST_SCOPES } from '#constants/trust'
import { getIptcDigitalSourceTypeKey, isIptcDigitalSourceTypeAi, isIptcDigitalSourceTypeCamera } from '#helpers/iptc'
import type {
	SywData,
	KnownMediaType,
	MediaType,
	C2paOptions,
	C2paProvenance,
	C2paTrustValue,
	ManifestActions,
	ManifestGenerator,
	ManifestLocation,
	ManifestTimestamp,
	ManifestType,
	ManifestTypeKey,
	Manifest,
} from '#types/c2pa'
import type { ManifestTrust } from '#types/trust'

/////////////// Initialize //////////////

/**
 * Creates C2PA instance configuration
 * @async
 * @param c2paOptions - Optional overrides
 * @param c2paOptions.wasmSrc - Custom WASM source URL
 * @param c2paOptions.settings.trust - Custom C2PA trust anchors, user anchors and allowed list
 * @param c2paOptions.settings.cawgTrust - Custom CAWG trust anchors, user anchors and allowed list
 * @return C2PA configuration object
 */
export const getC2paConfig = async (c2paOptions: C2paOptions = {}): Promise<Config> => ({
	wasmSrc: c2paOptions.wasmSrc || C2PA_WEB_WASM_CDN_URL,
	settings: {
		...(c2paOptions?.settings || {}),
		trust: {
			...(c2paOptions?.settings?.trust || {}),
			...(await getTrustListSettings(TRUST_LIST_SCOPES.C2PA, c2paOptions?.settings?.trust)),
		},
		cawgTrust: {
			...(c2paOptions?.settings?.cawgTrust || {}),
			...(await getTrustListSettings(TRUST_LIST_SCOPES.CAWG, c2paOptions?.settings?.cawgTrust)),
		}
	}
})

/**
 * Fetches a media source
 * @async
 * @param src - Media URL
 * @return Blob and MIME type of the fetched file
 */
export const fetchMedia = async (src: string) => {
	const response = await fetch(src)
	const blob = await response.blob()
	const mimeType = blob.type || response.headers.get('content-type') || ''
	return { blob, mimeType }
}

/**
 * Reads C2PA data from a fetched media blob
 * @async
 * @param c2pa - C2PA instance
 * @param blob - Fetched media file
 * @param mimeType - MIME type of the fetched file
 * @param settings - Settings merged over the C2PA instance's settings for this read
 * @return Manifest store and reader
 */
export const readC2paFromBlob = async (c2pa: C2pa, blob: Blob, mimeType: string, settings?: Settings) => {
	const reader: Reader | null | undefined = await c2pa.reader.fromBlob(mimeType, blob, settings)
    const manifestStore = await reader?.manifestStore()
    return { manifestStore, reader }
}

/**
 * Reads C2PA trust
 * @async
 * @param provenance - C2PA provenance
 * @return Trust
 */
export const getC2paTrust = async (provenance: C2paProvenance | null): Promise<C2paTrustValue> => {
	if(provenance) {
		const validationStatus = provenance?.manifestStore?.validation_state;
		if(validationStatus === "Trusted") {
			return "trusted";
		} else if(provenance.legacyManifestStore?.validation_state === "Trusted") {
			return "trusted_legacy";
		} else if(validationStatus === "Valid") {
			return "valid";
		} else if(validationStatus === "Invalid") {
			return "invalid";
		} else {
			return "unknown";
		}
	} else {
		return "validating";
	}
}

/////////////// Utilities ///////////////

/**
 * Gets an EXIF value from manifest
 * @function
 * @param data - C2paManifest entry
 * @param key - EXIF value key
 * @return EXIF value
 */
export const getExifValue = (data: C2paManifest | null | undefined, key: string): unknown => {
	const exifData = data?.assertions?.find(a => a.label === 'stds.exif')?.data as Record<string, unknown> | undefined
	const exifValue = exifData && exifData[`exif:${key}`]
	return exifValue;
}

/**
 * Checks if an EXIF value exists in manifest
 * @function
 * @param data - C2paManifest entry
 * @return Boolean
 */
export const ifHasExif = (data: C2paManifest | null | undefined): boolean | undefined => {
	return data?.assertions?.some(a => a.label === 'stds.exif')
}

/**
 * Gets a schema.org value from manifest
 * @function
 * @param data - C2paManifest entry
 * @param key - Schema.org value key
 * @return Schema.org value
 */
export const getSchemaOrgValue = (data: C2paManifest | null | undefined, key: string): unknown => {
	const schema = data?.assertions?.find(a => a.label.includes('stds.schema-org'))?.data as Record<string, unknown> | undefined
	const schemaValue = schema && schema[key]
	return schemaValue
}

/**
 * Gets a C2PA action value from manifest
 * @function
 * @param data - C2paManifest entry
 * @return C2PA actions
 */
export const getC2paActions = (data: C2paManifest | null | undefined): Action[] | undefined => {
	const actions = (data?.assertions?.find(a => a.label.includes('c2pa.actions'))?.data as { actions?: Action[] } | undefined)?.actions
	return actions
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

/////////////// Manifest Creation ///////////////

/**
 * Gets manifest ID
 * @function
 * @param data - C2paManifest entry
 * @return Instance ID
 */
export const getId = (data: C2paManifest | null | undefined) => data?.instance_id

/**
 * Gets producer name
 * @function
 * @param manifest - C2paManifest entry
 * @return Producer name
 */
export const getProducer = (manifest: C2paManifest | null | undefined): unknown => {
	const authorObj = getSchemaOrgValue(manifest, 'author')
	return authorObj ?? []
}

/**
 * Gets a description of claim generator
 * @async
 * @function
 * @param manifest - C2paManifest entry
 * @param reader - C2PA reader instance
 * @return List of generator names with version (i.e. Lightroom Classic 14.0) and icon URL
 */
export const getGenerator = async (manifest: C2paManifest | null | undefined, reader: Reader | null | undefined): Promise<ManifestGenerator> => {
	let generator: ManifestGenerator = []
	if(manifest?.claim_generator_info) {
		generator = await Promise.all(manifest.claim_generator_info.map(async d => {
			const icon = d?.icon as { identifier?: string, format?: string } | null | undefined
			return {
				name: d.name,
				// detail: d.version,
				icon: await convertJumbfToBlobUrl(reader, icon?.identifier, icon?.format),
			}
		}))
	} else if(getExifValue(manifest, 'Make') || getExifValue(manifest, 'Model')) {
		const exifModel = getExifValue(manifest, 'Model')
		generator = [{
			name: exifModel as string,
			// detail: exifMake,
		}]
	} else if(manifest?.claim_generator) {
		generator = [{
			name: manifest?.claim_generator
		}]
	}
	return generator
}

/**
 * Gets manifest type
 * @function
 * @param manifest - C2paManifest entry
 * @return Manifest type
 */
export const getType = (manifest: C2paManifest | null | undefined): ManifestType | null => {
	const createdAction = getC2paActions(manifest)?.find(a => a?.action === "c2pa.created")
	console.log(manifest, createdAction)
	let typeKey: ManifestTypeKey = "unknown";
	let iptcDigitalSourceType
	if(createdAction) {
		iptcDigitalSourceType = getIptcDigitalSourceTypeKey(createdAction?.digitalSourceType)
		// TEMP: Not exhausted list of possible news codes
		if(isIptcDigitalSourceTypeCamera(iptcDigitalSourceType)) {
			typeKey = "camera"
		} else if(isIptcDigitalSourceTypeAi(iptcDigitalSourceType)) {
			typeKey = "ai"
		}
	} else if(ifHasExif(manifest)) {
		// TEMP: Unsure if EXIF detection is a safe determinant
		typeKey = "camera"
	} else if(manifest?.signature_info?.issuer === "Adobe Inc.") {
		// TEMP: Unsure if "Adobe Inc." detection is a safe determinant
		typeKey = "edit"
	} else if(manifest?.signature_info?.issuer === "Camera Bits, Inc.") {
		// TEMP: Unsure if "Camera Bits, Inc." detection is a safe determinant
		typeKey = "edit"
	}
	return {
		key: typeKey,
		iptc:  iptcDigitalSourceType
	}
}

export const getTypes = (manifests: Manifest[] | undefined): ManifestType[] =>
	manifests?.map(m => m?.type)?.filter((m): m is ManifestType => Boolean(m)) ?? []

/**
 * Gets a manifest's trust
 * @function
 * @param manifest - C2paManifest entry
 * @param provenance - C2PA provenance
 * @return Manifest trust
 */
export const getTrust = (manifest: C2paManifest, provenance: C2paProvenance | null): ManifestTrust => {
	const validation = getManifestValidation(manifest, provenance?.manifestStore)
	const legacyValidation = getManifestValidation(manifest, provenance?.legacyManifestStore)
	return getManifestTrust(manifest, validation, legacyValidation)
}

/**
 * Reads C2PA data again with legacy trust lists, when it isn't trusted by the other lists
 * @async
 * @param c2pa - C2PA instance
 * @param blob - Fetched media file
 * @param mimeType - MIME type of the fetched file
 * @param manifestStore - Manifest store read without legacy trust lists
 * @return Manifest store read with legacy trust lists
 */
const readLegacyManifestStore = async (c2pa: C2pa, blob: Blob, mimeType: string, manifestStore: ManifestStore | null | undefined) => {
	if(!manifestStore || isFullyTrusted(manifestStore)) return null
	const { manifestStore: legacyManifestStore, reader } = await readC2paFromBlob(c2pa, blob, mimeType, await getLegacyTrustSettings())
	await reader?.free()
	return legacyManifestStore ?? null
}

/**
 * Gets signature issuer
 * @function
 * @param manifest - C2paManifest entry
 * @return Signature issuer name
 */
export const getSignator = (manifest: C2paManifest | null | undefined) =>
	manifest?.signature_info?.issuer

/**
 * Gets a localized date string from manifest entry's date
 * @function
 * @param manifest - C2paManifest entry
 * @return Localized date string
 */
export const getTimestamp = (manifest: C2paManifest | null | undefined): ManifestTimestamp | null => {
	// TODO: track where the time came from (EXIF or signature) and if the offset was found (via GPS or not) and pass a source key that can properly label the assumed accuracy of the time
	// TODO: Prioritize TSA trusted timestamps
	let date: Date | undefined, offset: string | null | undefined
	if(getExifValue(manifest, 'DateTimeOriginal')) {
		const exifDateTime = getExifValue(manifest, 'DateTimeOriginal') as string
		const exifParsedDate = exifDateTime?.split(/\D/)
		const exifOffset = getExifValue(manifest, 'OffsetTimeOriginal') as string ?? null
		if(exifParsedDate.length === 6) {
			const [year, month, day, hour, minute, second] = exifParsedDate
			date = exifOffset
				? new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}${exifOffset}`)
				: new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute), Number(second))
			offset = exifOffset
		} else {
			return null
		}
	} else if(manifest?.signature_info?.time) {
		const isoString = manifest.signature_info.time
		const offsetMatch = isoString.match(/([+-]\d{2}:\d{2})$|Z$/)
		date = new Date(isoString)
		offset = !offsetMatch || offsetMatch[0] === 'Z' ? '+00:00' : offsetMatch[0]
	}
	return date && isFinite(date.getTime()) ? {
		date,
		offset
	} : null
}

/**
 * Gets latitude and longitude
 * @function
 * @param manifest - C2paManifest entry
 * @return Object of latitude (lat) and longitude (lng)
 */
export const getLocation = (manifest: C2paManifest | null | undefined): ManifestLocation | null => {
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
	return { lat, lng }
}

/**
 * Gets ingredients from manifest
 * @function
 * @param manifest - C2paManifest entry
 * @return Array of ingredients
 */
export const getIngredients = (manifest: C2paManifest | null | undefined): unknown[] => {
	return []
}

/**
 * Gets action keys from manifest
 * @function
 * @param manifest - C2paManifest entry
 * @return Array of action keys
 */
export const getActions = (manifest: C2paManifest | null | undefined): ManifestActions | undefined => {
	const c2paActions = getC2paActions(manifest)
		?.map(action => {
			const actionKey = action.action?.replace(".", "_")
			const iptcDigitalSourceType = getIptcDigitalSourceTypeKey(action?.digitalSourceType)
			return {
				key: actionKey,
				iptc: iptcDigitalSourceType,
			}
		})
		?.reduce((arr: ManifestActions, val) =>
			!arr.some(v =>
				v.key === val.key && v.iptc === val.iptc
			)
				? [...arr, val]
				: arr
		, [])
	return c2paActions
}

/**
 * Gets thumbnail blob URL from manifest
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
 * Gets URL to CAI Verify page with image URL as parameter
 * @function
 * @param src - Image URL
 * @return Verify site URL
 */
export const getVerifyUrl = (src: string) => `https://${VERIFY_BASE_URL}?source=${src}`

/**
 * Prepares a manifest object with extracted and formatted data
 * @async
 * @function
 * @param props - Object of props
 * @param props.src - Image URL
 * @param props.manifest - C2paManifest entry
 * @param props.reader - C2PA reader instance
 * @return Prepared manifest object
 */
export const prepareManifest = async ({ src, manifest, provenance, reader }: {
	src: string
	manifest: C2paManifest
	provenance: C2paProvenance | null
	reader: Reader | null | undefined
}): Promise<Manifest> => {
	return {
		id: getId(manifest),
		type: getType(manifest),
		trust: getTrust(manifest, provenance),
		timestamp: getTimestamp(manifest),
		producer: getProducer(manifest),
		signator: getSignator(manifest),
		generator: await getGenerator(manifest, reader),
		actions: getActions(manifest),
		// ingredients: getIngredients(manifest),
		thumbnail: await getThumbnail(manifest, reader),
		location: getLocation(manifest),
		verifyUrl: getVerifyUrl(src),
		original: manifest
	}
}

/**
 * Prepares a provenance object into sorted array of formatted manifests
 * @async
 * @function
 * @param props - Object of props
 * @param props.src - Image URL
 * @param props.provenance - C2PA full provenance
 * @param props.reader - C2PA reader instance
 * @return Prepared manifest object
 */
export const prepareManifests = async ({ src, provenance, reader }: {
	src: string
	provenance: C2paProvenance | null
	reader: Reader | null | undefined
}): Promise<Manifest[]> => {
	try {
        if(!provenance?.manifestStore) return []
        const manifests = Object.values(provenance.manifestStore.manifests ?? {})
        const preparedManifests = await Promise.all(
            manifests.map(manifest =>
				prepareManifest({ src, manifest, provenance, reader })
			)
        )
		preparedManifests.sort((a, b) =>
			(a?.timestamp?.date?.getTime?.() || 0) - (b?.timestamp?.date?.getTime?.() || 0)
		)
        return preparedManifests
    } catch (error) {
        console.error(error)
        return []
    }
}

/**
 * Prepares data from C2PA
 * @async
 * @function
 * @param props - Object of props
 * @param props.c2pa - C2PA instance
 * @param props.src - Image URL
 * @param props.locale - User's locale
 * @return Prepared manifest object
 */
export const prepareC2paData = async ({ c2pa, src, mediaType: userMediaType }: {
	c2pa: C2pa | null | undefined
	src: string
	mediaType: MediaType
}): Promise<SywData> => {
	// Take the user's media type as fact, otherwise detect it from src, the fetched file's MIME type and the C2PA manifest's format
	const isUserMediaType = isKnownMediaType(userMediaType)
	let mediaType = isUserMediaType ? userMediaType : getMediaType(src)
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
        const manifests = await prepareManifests({ src, provenance, reader })
		const trust = await getC2paTrust(provenance)
        const types = getTypes(manifests)
        data = {
            phase: C2PA_PHASES.READY,
            trust,
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
            phase: C2PA_PHASES.ERROR,
            trust: C2PA_TRUST_VALUES.UNKNOWN,
			mediaType,
            error: error as Error,
        }
    }
	return data
};

export const prepareData = async ({
	c2pa,
	src,
	mediaType,
}: {
	c2pa: C2pa | null | undefined
	src: string
	mediaType: MediaType
}): Promise<SywData> => {
	if(!src) return C2PA_DATA_DEFAULT
	const preparedData = await prepareC2paData({ c2pa, src, mediaType })
	console.log(preparedData)
	return preparedData;
}

let cachedC2pa: C2pa | null = null
export const parseSywData = async (
	src: string,
	options: {
		locale?: string,
		c2paOptions?: C2paOptions,
		mediaType?: KnownMediaType
	} = {}
): Promise<SywData> => {
	if(!src) return C2PA_DATA_DEFAULT
	if(typeof Worker === 'undefined') return C2PA_DATA_DEFAULT
	const { c2paOptions = {}, mediaType = C2PA_MEDIA_TYPES.UNKNOWN } = options
	if(!cachedC2pa) cachedC2pa = await createC2pa(await getC2paConfig(c2paOptions))
	const preparedData = prepareData({ c2pa: cachedC2pa, src, mediaType })
	return preparedData
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