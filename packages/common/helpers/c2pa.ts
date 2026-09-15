import { createC2pa } from '@contentauth/c2pa-web'
import type { Reader, C2paSdk, Config } from '@contentauth/c2pa-web'
import type { Manifest as C2paManifest, Action } from '@contentauth/c2pa-types'
import TRUST_LISTS from '#trustlists'
import { VERIFY_BASE_URL } from '#constants/index'
import { C2PA_PHASES, C2PA_DATA_DEFAULT, C2PA_STATUSES, C2PA_WEB_WASM_CDN_URL } from '#constants/c2pa'
import { convertJumbfToDataUri, getMediaType } from '#helpers/index'
import { getIptcDigitalSourceTypeKey, isIptcDigitalSourceTypeAi, isIptcDigitalSourceTypeCamera } from '#helpers/iptc'
import type {
	SywData,
	C2paOptions,
	C2paProvenance,
	C2paStatus,
	ManifestActions,
	ManifestGenerator,
	ManifestLocation,
	ManifestTimestamp,
	ManifestType,
	ManifestTypeKey,
	Manifest,
} from '#types/c2pa'

/////////////// Initialize //////////////

/**
 * Creates C2PA instance configuration
 * @param c2paOptions - Optional overrides
 * @param c2paOptions.wasmSrc - Custom WASM source URL
 * @param c2paOptions.trustLists - Custom trust anchors file
 * @return C2PA configuration object
 */
export const getC2paConfig = (c2paOptions: C2paOptions = {}): Config => ({
	wasmSrc: c2paOptions.wasmSrc || C2PA_WEB_WASM_CDN_URL,
	settings: {
		...(c2paOptions?.settings || {}),
		trust: {
			...(c2paOptions?.settings?.trust || {}),
			trustAnchors: c2paOptions?.settings?.trust?.trustAnchors || joinPem(Object.values(TRUST_LISTS)),
		}
	}
})

/**
 * Reads C2PA data from an image source
 * @async
 * @param c2pa - C2PA instance
 * @param src - Image URL
 * @return Manifest store and reader
 */
export const readC2paFromUrl = async (c2pa: C2paSdk, src: string) => {
	let reader: Reader | null | undefined
	const mediaType = getMediaType(src)
	if(mediaType === "image") {
		const response = await fetch(src)
		const blob = await response.blob()
		reader = await c2pa.reader.fromBlob(blob.type, blob)
	} else if(mediaType === "video") {
		const response = await fetch(src)
		const blob = await response.blob()
		reader = await c2pa.reader.fromBlob(blob.type, blob)
	}
    const manifestStore = await reader?.manifestStore()
    return { manifestStore, reader }
}

/**
 * Reads C2PA validity status
 * @async
 * @param provenance - C2PA provenance
 * @return Validation status
 */
export const getC2paStatus = async (provenance: C2paProvenance | null): Promise<C2paStatus> => {
	if(provenance) {
		const validationStatus = provenance?.manifestStore?.validation_state;
		if(validationStatus === "Trusted") {
			return "trusted";
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

/**
 * Joins strings of PEM file contents
 * @function
 * @param pems - Array of raw string of PEM file contents
 * @returns Compined string of PEM file contents
 */
const joinPem = (pems: string[]): string => {
	return pems.map(cleanPem).join("\n")
}

/**
 * Cleans string of PEM file contents
 * @function
 * @param pem - Raw string of PEM file contents
 * @returns Cleaned string of PEM file contents
 */
const cleanPem = (pem: string): string => {
	const certs = pem.match(/-----BEGIN CERTIFICATE-----[\s\S]+?-----END CERTIFICATE-----/g);
	return certs ? certs.join("\n") : "";
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
 * @function
 * @param manifest - C2paManifest entry
 * @return List of generator names with version (i.e. Lightroom Classic 14.0)
 */
export const getGenerator = (manifest: C2paManifest | null | undefined): ManifestGenerator => {
	let generator: ManifestGenerator = []
	if(manifest?.claim_generator_info) {
		generator = manifest.claim_generator_info.map(d => ({
			name: d.name,
			// detail: d.version,
			icon: {
				identifier: (d?.icon as { identifier?: string } | null | undefined)?.identifier,
				format: (d?.icon as { format?: string } | null | undefined)?.format,
			},
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
	const hasExif = ifHasExif(manifest)
	const createdAction = getC2paActions(manifest)?.find(a => a?.action === "c2pa.created")
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
	} else if(hasExif) {
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
 * Gets a manifest's validation status
 * @function
 * @param manifest - C2paManifest entry
 * @param provenance - C2PA provenance
 * @return Validation status
 */
export const getStatus = (manifest: C2paManifest, provenance: C2paProvenance | null): C2paStatus => {
	const { validation_results, active_manifest } = provenance?.manifestStore ?? {};
	let validation;

	if(manifest.label === active_manifest) {
		validation = validation_results?.activeManifest ?? null;
	} else {
		const ingredientDelta = validation_results?.ingredientDeltas?.find(
		({ validationDeltas }) =>
			validationDeltas.success.some(({ url }) =>
				url?.includes(manifest.label ?? '')
			) ||
			validationDeltas.failure.some(({ url }) =>
				url?.includes(manifest.label ?? '')
			)
		);
		validation = ingredientDelta?.validationDeltas ?? null;
	}
	const status = validation !== null && validation.failure.length === 0
		? C2PA_STATUSES.TRUSTED
		: C2PA_STATUSES.INVALID;
	return status;
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
 * Gets thumbnail data URI from manifest
 * @function
 * @param manifest - C2paManifest entry
 * @param reader - C2PA reader instance
 * @return Thumbnail URL
 */
export const getThumbnail = async (manifest: C2paManifest | null | undefined, reader: Reader | null | undefined): Promise<string | null> => {
	const thumbnail = manifest?.thumbnail
	return await convertJumbfToDataUri(reader, thumbnail?.identifier, thumbnail?.format)
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
 * @param props.locale - User's locale
 * @param props.manifest - C2paManifest entry
 * @param props.reader - C2PA reader instance
 * @return Prepared manifest object
 */
export const prepareManifest = async ({ src, locale, manifest, provenance, reader }: {
	src: string
	locale: string
	manifest: C2paManifest
	provenance: C2paProvenance | null
	reader: Reader | null | undefined
}): Promise<Manifest> => {
	return {
		id: getId(manifest),
		type: getType(manifest),
		status: getStatus(manifest, provenance),
		timestamp: getTimestamp(manifest),
		producer: getProducer(manifest),
		signator: getSignator(manifest),
		generator: getGenerator(manifest),
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
 * @param props.locale - User's locale
 * @param props.provenance - C2PA full provenance
 * @param props.reader - C2PA reader instance
 * @return Prepared manifest object
 */
export const prepareManifests = async ({ src, locale, provenance, reader }: {
	src: string
	locale: string
	provenance: C2paProvenance | null
	reader: Reader | null | undefined
}): Promise<Manifest[]> => {
	try {
        if(!provenance?.manifestStore) return []
        const manifests = Object.values(provenance.manifestStore.manifests ?? {})
        const preparedManifests = await Promise.all(
            manifests.map(manifest =>
				prepareManifest({ src, locale, manifest, provenance, reader })
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
export const prepareC2paData = async ({ c2pa, src, locale }: {
	c2pa: C2paSdk | null | undefined
	src: string
	locale: string
}): Promise<SywData> => {
    if(!c2pa || !src) return C2PA_DATA_DEFAULT
	let data: SywData
    try {
        const c2paData = await readC2paFromUrl(c2pa, src)
		const { manifestStore, reader } = c2paData
        const provenance = manifestStore ? { manifestStore } : null
        const manifests = await prepareManifests({ src, locale, provenance, reader })
		const status = await getC2paStatus(provenance)
        const types = getTypes(manifests)
        data = {
            phase: C2PA_PHASES.READY,
            status,
            types,
            // provenance,
			manifests,
            reader: reader ?? null,
            error: null,
        }
    } catch (error) {
		console.error(error)
        data = {
            ...C2PA_DATA_DEFAULT,
            phase: C2PA_PHASES.ERROR,
            status: C2PA_STATUSES.UNKNOWN,
            error: error as Error,
        }
    }
	return data
};

export const prepareData = async ({
	c2pa,
	src,
	locale
}: {
	c2pa: C2paSdk | null | undefined
	src: string
	locale: string
}): Promise<SywData> => {
	if(!src) return C2PA_DATA_DEFAULT
	const preparedData = await prepareC2paData({ c2pa, src, locale })
	console.log(preparedData)
	return preparedData;
}

let cachedC2pa: C2paSdk | null = null
export const parseSywData = async (
	src: string,
	options: {
		locale?: string,
		c2paOptions?: C2paOptions
	} = {}
): Promise<SywData> => {
	if(!src) return C2PA_DATA_DEFAULT
	if(typeof Worker === 'undefined') return C2PA_DATA_DEFAULT
	const { locale = '', c2paOptions = {} } = options
	if(!cachedC2pa) cachedC2pa = await createC2pa(getC2paConfig(c2paOptions))
	const preparedData = prepareData({ c2pa: cachedC2pa, src, locale })
	return preparedData
}
