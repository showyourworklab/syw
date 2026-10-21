import type { Reader, C2pa, Config, Settings } from '@contentauth/c2pa-web'
import type { Manifest as C2paManifest, ManifestStore, Action } from '@contentauth/c2pa-types'
import { C2PA_ACTIONS, C2PA_INGREDIENT_RELATIONSHIPS, C2PA_WEB_WASM_CDN_URL } from '#constants/c2pa'
import { getLegacyTrustSettings, getTrustListSettings, isFullyTrusted } from '#helpers/trust'
import { CAWG_IDENTITY_LABEL, TRUST_LIST_SCOPES } from '#constants/trust'
import { getIptcDigitalSourceTypeKey, isIptcDigitalSourceTypeAi, isIptcDigitalSourceTypeAiComposite, isIptcDigitalSourceTypeCamera } from '#helpers/iptc'
import type { C2paOptions } from '#types/c2pa'
import type { ManifestTypeIptc } from '#types/data'

/////////////// Initialize ///////////////

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
 * Reads C2PA data again with legacy trust lists, when it isn't trusted by the other lists
 * @async
 * @param c2pa - C2PA instance
 * @param blob - Fetched media file
 * @param mimeType - MIME type of the fetched file
 * @param manifestStore - Manifest store read without legacy trust lists
 * @return Manifest store read with legacy trust lists
 */
export const readLegacyManifestStore = async (c2pa: C2pa, blob: Blob, mimeType: string, manifestStore: ManifestStore | null | undefined) => {
	if(!manifestStore || isFullyTrusted(manifestStore)) return null
	const { manifestStore: legacyManifestStore, reader } = await readC2paFromBlob(c2pa, blob, mimeType, await getLegacyTrustSettings())
	await reader?.free()
	return legacyManifestStore ?? null
}

/////////////// Actions ///////////////

/**
 * Gets a C2PA action value from manifest
 * @function
 * @param data - C2paManifest entry
 * @return C2PA actions
 */
export const getC2paActions = (data: C2paManifest | null | undefined): Action[] | undefined =>
	getAssertionData(data, 'c2pa.actions', true)?.actions as Action[] | undefined

/**
 * Gets the first C2PA action of a name from manifest
 * @function
 * @param data - C2paManifest entry
 * @param action - C2PA action name
 * @return C2PA action
 */
export const getC2paAction = (data: C2paManifest | null | undefined, action: string): Action | undefined =>
	getC2paActions(data)?.find(a => a?.action === action)

/**
 * Checks if manifest contains a C2PA action
 * @function
 * @param data - C2paManifest entry
 * @param action - C2PA action name
 * @return Boolean
 */
export const hasC2paAction = (data: C2paManifest | null | undefined, action: string): boolean =>
	Boolean(getC2paAction(data, action))

/**
 * Gets the IPTC digital source type keys of all C2PA actions
 * @function
 * @param data - C2paManifest entry
 * @return IPTC digital source type keys
 */
export const getC2paActionsIptc = (data: C2paManifest | null | undefined): string[] =>
	(getC2paActions(data) ?? [])
		.map(a => getIptcDigitalSourceTypeKey(a?.digitalSourceType))
		.filter((key): key is string => Boolean(key))

/**
 * Gets the IPTC digital source type that best describes manifest
 * @function
 * @param data - C2paManifest entry
 * @return Camera or AI IPTC key if found, preferring the created action's, otherwise the created action's or first IPTC key
 */
export const getManifestIptc = (data: C2paManifest | null | undefined): ManifestTypeIptc => {
	const createdIptcKey = getIptcDigitalSourceTypeKey(getC2paAction(data, C2PA_ACTIONS.CREATED)?.digitalSourceType)
	const iptcKeys = getC2paActionsIptc(data)
	const iptcKey = [createdIptcKey, ...iptcKeys].find(key => isIptcDigitalSourceTypeCamera(key) || isIptcDigitalSourceTypeAi(key))
		?? createdIptcKey
		?? iptcKeys[0]
	return iptcKey as ManifestTypeIptc
}

/**
 * Checks if manifest was opened from a prior asset or has a parent ingredient
 * @function
 * @param data - C2paManifest entry
 * @return Boolean
 */
export const isEditedManifest = (data: C2paManifest | null | undefined): boolean =>
	hasC2paAction(data, C2PA_ACTIONS.OPENED)
	|| Boolean(data?.ingredients?.some(i => i?.relationship === C2PA_INGREDIENT_RELATIONSHIPS.PARENT_OF))

/**
 * Checks if an AI manifest edited existing media rather than generating new media
 * @function
 * @param data - C2paManifest entry
 * @param iptc - IPTC digital source type key of manifest
 * @return Boolean
 */
export const isAiEditedManifest = (data: C2paManifest | null | undefined, iptc: ManifestTypeIptc): boolean =>
	isEditedManifest(data) || Boolean(isIptcDigitalSourceTypeAiComposite(iptc))

/////////////// Assertions ///////////////

/**
 * Gets an assertion's data from manifest
 * @function
 * @param data - C2paManifest entry
 * @param label - Assertion label
 * @param fuzzyLabel - Match labels containing the label (i.e. c2pa.actions.v2, cawg.identity__1)
 * @return Assertion data
 */
export const getAssertionData = (data: C2paManifest | null | undefined, label: string, fuzzyLabel?: boolean): Record<string, any> | undefined => {
	const assertion = data?.assertions?.find(a =>
		fuzzyLabel
			? a.label.includes(label)
			: a.label === label
	)
	return assertion?.data as Record<string, any> | undefined
}

/**
 * Gets an EXIF value from manifest
 * @function
 * @param data - C2paManifest entry
 * @param key - EXIF value key
 * @return EXIF value
 */
export const getExifValue = (data: C2paManifest | null | undefined, key: string): unknown => {
	const exifData = getAssertionData(data, 'stds.exif')
	const exifValue = exifData?.[`exif:${key}`]
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
	const schemaData = getAssertionData(data, 'stds.schema-org', true)
	const schemaValue = schemaData?.[key]
	return schemaValue
}

/**
 * Gets the name of manifest's first CAWG identity assertion
 * X.509 identities name the certificate's issuer
 * Identity claims aggregation identities name the first verified identity (i.e. a social media account)
 * @function
 * @param data - C2paManifest entry
 * @return CAWG identity name
 */
export const getCawgIdentityValue = (data: C2paManifest | null | undefined): string | null | undefined => {
	const cawgIdentityData = getAssertionData(data, CAWG_IDENTITY_LABEL, true)
	// The credential may be flattened into the assertion or nested under named_actor
	const verifiedIdentities = (cawgIdentityData?.verifiedIdentities ?? cawgIdentityData?.named_actor?.verifiedIdentities) as { name?: string, username?: string }[] | undefined
	const verifiedIdentity = verifiedIdentities?.find(i => i?.name || i?.username)
	const cawgIdentityValue = cawgIdentityData?.signature_info?.issuer
		?? verifiedIdentity?.name
		?? verifiedIdentity?.username
	return cawgIdentityValue
}

/**
 * Gets a CAWG metadata value from manifest
 * @function
 * @param data - C2paManifest entry
 * @param key - CAWG metadata value key
 * @return CAWG metadata value
 */
export const getCawgMetadataValue = (data: C2paManifest | null | undefined, key: string): unknown => {
	const cawgMetadataData = getAssertionData(data, 'cawg.metadata')
	const cawgMetadataValue = cawgMetadataData?.[key]
	return cawgMetadataValue
}

/////////////// Resources ///////////////

/**
 * Trims any bytes before an SVG's XML declaration or root element
 * c2pa-web can return an SVG stored in a data box with the manifest store's bytes before it (i.e. a generator icon)
 * @function
 * @param bytes - Resource bytes
 * @return SVG bytes
 */
export const trimSvgBytes = (bytes: Uint8Array): Uint8Array => {
	// Single-byte decoding keeps text indexes equal to byte indexes
	const text = new TextDecoder('latin1').decode(bytes)
	const svgIndex = text.indexOf('<svg')
	if (svgIndex <= 0) return bytes
	const xmlIndex = text.lastIndexOf('<?xml', svgIndex)
	const startIndex = xmlIndex >= 0 ? xmlIndex : svgIndex
	return startIndex > 0 ? bytes.subarray(startIndex) : bytes
}

/**
 * Converts JUMBF URI to blob URL for IMG src
 * @function
 * @param reader - C2PA reader instance
 * @param identifier - JUMBF URI string
 * @param format - Image format
 * @return Image blob URL
 */
export const convertJumbfToBlobUrl = async (reader: Reader | null | undefined, identifier: string | null | undefined, format: string | null | undefined): Promise<string | null> => {
	if (!reader || !identifier || !format) return null
	try {
		const bytes = await reader.resourceToBytes(identifier)
		if (bytes) {
			const resourceBytes = format === 'image/svg+xml' ? trimSvgBytes(bytes) : bytes
			const blob = new Blob([resourceBytes as BlobPart], { type: format })
			return URL.createObjectURL(blob)
		}
		return null
	} catch (error) {
		console.error('Failed to convert JUMBF to blob URL:', error)
		return null
	}
}
