import type { Manifest, ManifestAction } from '#types/data'
import type { ManifestDetailIconKey, SywIconType } from '#types/ui'
import { MANIFEST_ACTIONS_HIDDEN, MANIFEST_PREVIEW_TITLE_KEYS, SYW_ICONS } from '#constants/ui'
import { getObjectValue } from '#helpers/utils'

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
 * Whether an icon key refers to a custom SYW icon rather than a Lucide icon
 * @param type
 * @returns
 */
export const isSywIcon = (type: string | null | undefined): type is SywIconType => !!type && Object.prototype.hasOwnProperty.call(SYW_ICONS, type)

const MANIFEST_DETAIL_ICON_KEYS: readonly string[] = ['timestamp', 'producer', 'signator', 'location', 'actions', 'identity'] satisfies ManifestDetailIconKey[]

/**
 * Icon key for a Detail title, if that detail has one
 * @param key - Detail key, e.g. a manifest field key
 * @returns
 */
export const getManifestDetailIcon = (key: string | null | undefined): ManifestDetailIconKey | null =>
	key && MANIFEST_DETAIL_ICON_KEYS.includes(key) ? key as ManifestDetailIconKey : null

/**
 * Actions to show in the Actions detail, leaving out ones that don't change the file
 * @param manifest - Manifest
 * @returns
 */
export const getManifestDisplayActions = (manifest: Manifest | null | undefined): ManifestAction[] =>
	manifest?.actions?.value.filter(action => !MANIFEST_ACTIONS_HIDDEN.includes(action.key)) ?? []

/**
 * Title for a manifest preview without a type, from its generator names and signator
 * @param manifest - Manifest
 * @returns
 */
export const getManifestPreviewTitle = (manifest: Manifest | null | undefined): string =>
	MANIFEST_PREVIEW_TITLE_KEYS.map(key =>
		key === 'generator'
			? manifest?.generator?.value.map(entry => entry.name).filter(Boolean).join(', ')
			: manifest?.[key]
	).filter(Boolean).join(' ')
