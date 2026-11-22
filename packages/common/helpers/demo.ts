import type { Manifest } from '#types/data'
import type { ManifestOverride } from '#types/demo'

/**
 * Checks if a value is a plain object, not an array, date or class instance
 * @function
 * @param value - Any value
 * @return Boolean
 */
const isPlainObject = (value: unknown): value is Record<string, unknown> =>
	!!value && typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype

/**
 * Deeply merges a source into a target without mutating either
 * Only plain objects are merged, anything else in source replaces the target value
 * @function
 * @param target - Object to merge into
 * @param source - Object to merge from
 * @return Merged object
 */
export const deepMerge = <T,>(target: T, source: unknown): T => {
	if(!isPlainObject(target) || !isPlainObject(source)) return (source === undefined ? target : source) as T
	const merged: Record<string, unknown> = { ...target }
	for(const [key, value] of Object.entries(source)) {
		if(value === undefined) continue
		merged[key] = deepMerge(merged[key], value)
	}
	return merged as T
}

/**
 * Prepares an empty manifest for overrides that have no prepared manifest to merge into
 * @function
 * @param index - Index of the override
 * @return Prepared manifest object
 */
const prepareOverrideManifest = (index: number): Manifest => ({
	id: `override-${index}`,
	type: null,
	validation: null,
	timestamp: null,
	identity: null,
	producer: null,
	generator: null,
	thumbnail: null,
	location: null,
})

/**
 * Merges overrides into prepared manifests by index, adding a manifest for each override past the last one
 * @function
 * @param manifests - Prepared manifests
 * @param overrides - Manifest overrides
 * @return Overridden manifests
 */
export const applyManifestOverrides = (manifests: Manifest[], overrides: ManifestOverride[] | null | undefined): Manifest[] => {
	if(!overrides?.length) return manifests
	const length = Math.max(manifests.length, overrides.length)
	return Array.from({ length }, (_, index) =>
		deepMerge(manifests[index] ?? prepareOverrideManifest(index), overrides[index] ?? {})
	)
}
