import type { Manifest } from '#types/c2pa'
import type { MediaType } from '#types/ui'
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
 * Get media type of src
 * @function
 * @param src - String of media source
 * @returns Returns "image" or "video"
 */
export const getMediaType = (src: string | null | undefined): MediaType | null => {
	// TODO: Needs less rudementary check
	if(!src) {
		return null
	}
	else if(src.endsWith("mp4")) {
		return "video"
	} else {
		return "image"
	}
}

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