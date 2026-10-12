import type { KnownMediaType, Manifest, MediaType } from '#types/c2pa'
import type { SywIconType } from '#types/ui'
import { SYW_ICONS } from '#constants/ui'
import { C2PA_MEDIA_TYPES, C2PA_IMAGE_EXTENSIONS, C2PA_VIDEO_EXTENSIONS } from '#constants/c2pa'
import type { Reader } from '@contentauth/c2pa-web'

interface A11yClickEvent {
	key: string
	preventDefault: () => void
}

/**
 * Joins keys together into a class name prefixed by namespace
 * @param arr
 * @returns
 */
export const classNames = (...arr: (string | false | null | undefined)[]) => arr.filter((c): c is string => Boolean(c)).map(c => c.startsWith(`Syw-`) ? c : `Syw-${c}`).join(' ')

/**
 * Handles a11y "clicks" with focused enter or space presses
 * @param event
 * @param callback
 */
export const handleA11yClick = (event: A11yClickEvent, callback?: (event: A11yClickEvent) => void) => {
	if(event.key === 'Enter' || event.key === ' ') {
		event.preventDefault()
		if(callback) callback(event)
	}
}

/**
 * Get an object's value by a key using a case-insensitive match
 * @function
 * @param key - String key of the desired value (case-insensitive)
 * @param object - Any object
 * @returns Whatever the value is
 */
export const getObjectValue = (key: string | null | undefined, object: Record<string, unknown> | null | undefined): unknown => {
	const safeKey = key && object
		? Object.keys(object).find((value, index) =>
			String(key).toLowerCase() === String(value).toLowerCase()
		) : null;
	return safeKey && object?.hasOwnProperty(safeKey) ? object[safeKey] : null;
}

/**
 * Get media type from a MIME type
 * @function
 * @param mimeType - MIME type (i.e. image/jpeg)
 * @returns Returns "image", "video" or "unknown"
 */
export const getMediaTypeFromMimeType = (mimeType: string | null | undefined): MediaType => {
	const prefix = mimeType?.split('/')[0]?.trim().toLowerCase()
	if(prefix === C2PA_MEDIA_TYPES.IMAGE) return C2PA_MEDIA_TYPES.IMAGE
	if(prefix === C2PA_MEDIA_TYPES.VIDEO) return C2PA_MEDIA_TYPES.VIDEO
	return C2PA_MEDIA_TYPES.UNKNOWN
}

/**
 * Guess media type of src without fetching it
 * Use the MIME type of the fetched file (see getMediaTypeFromMimeType) when available
 * @function
 * @param src - String of media source
 * @returns Returns "image", "video" or "unknown"
 */
export const getMediaType = (src: string | null | undefined): MediaType => {
	if(!src) return C2PA_MEDIA_TYPES.UNKNOWN
	// Data URLs include their MIME type (i.e. data:image/png;base64,...)
	if(src.startsWith('data:')) {
		return getMediaTypeFromMimeType(src.slice(5).split(/[;,]/)[0])
	}
	// Ignore query strings and hashes (i.e. photo.jpg?w=800)
	const path = src.split(/[?#]/)[0]
	const extension = path.split('/').pop()?.split('.').pop()?.toLowerCase()
	if(extension && C2PA_IMAGE_EXTENSIONS.includes(extension)) return C2PA_MEDIA_TYPES.IMAGE
	if(extension && C2PA_VIDEO_EXTENSIONS.includes(extension)) return C2PA_MEDIA_TYPES.VIDEO
	// Unrecognized until the fetched MIME type says otherwise
	return C2PA_MEDIA_TYPES.UNKNOWN
}

/**
 * Whether a media type is set and not "unknown"
 * @function
 * @param mediaType - Media type
 * @returns boolean
 */
export const isKnownMediaType = (mediaType: MediaType | null | undefined): mediaType is KnownMediaType =>
	!!mediaType && mediaType !== C2PA_MEDIA_TYPES.UNKNOWN

/**
 * Resolve media type from the first known source, only guessing from src when none are known
 * @function
 * @param src - String of media source
 * @param mediaTypes - Media types in order of trust (i.e. user provided, fetched MIME type, C2PA manifest format)
 * @returns Returns "image", "video" or "unknown"
 */
export const resolveMediaType = (src: string | null | undefined, ...mediaTypes: (MediaType | null | undefined)[]): MediaType =>
	mediaTypes.find(isKnownMediaType) ?? getMediaType(src)

/**
 * Get available tabs based on manifest
 * @function
 * @param keys - Array of string keys
 * @param data - Manifest entry
 * @returns Returns array of string keys
 */
export const getAvailableTabs = (keys: readonly string[] | undefined, data: Manifest): string[] =>
	(keys ?? []).filter(key => {
		const value = getObjectValue(key, data as any) as any
		if(key === "actions") {
			return value?.length
		} else if(key === "location") {
			return !isNaN(value?.lat as number) && !isNaN(value?.lng as number)
		} else {
			return true
		}
	})

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
			const blob = new Blob([bytes as BlobPart], { type: format })
			return URL.createObjectURL(blob)
		}
		return null
	} catch (error) {
		console.error('Failed to convert JUMBF to blob URL:', error)
		return null
	}
}

/**
 * Revokes blob URLs of prepared manifests
 * @function
 * @param manifests - Prepared manifests
 */
export const revokeManifestBlobUrls = (manifests: Manifest[] | null | undefined) => {
	for(const manifest of manifests ?? []) {
		if(manifest.thumbnail) URL.revokeObjectURL(manifest.thumbnail)
		for(const generator of manifest.generator ?? []) {
			if(generator.icon) URL.revokeObjectURL(generator.icon)
		}
	}
}

/**
 * Whether an icon key refers to a custom SYW icon rather than a Lucide icon
 * @param type
 * @returns
 */
export const isSywIcon = (type: string | null | undefined): type is SywIconType => !!type && Object.prototype.hasOwnProperty.call(SYW_ICONS, type)
