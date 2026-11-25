import type { Manifest, ManifestAction } from '#types/data'
import type { ManifestDetailIconKey, SywIconType } from '#types/ui'
import { MANIFEST_ACTIONS_HIDDEN, MANIFEST_PREVIEW_TITLE_KEYS, VIEWPORT_NEAR_MARGIN, SYW_ICONS } from '#constants/ui'
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
 * Applies passed image attributes over the default ones (lazy loading, async decoding)
 * @function
 * @param imageAttrs - Attributes for the image element
 * @return Attributes for the image element
 */
export const getImageAttrs = <T extends object,>(imageAttrs: T | null | undefined): T => ({
	loading: 'lazy',
	decoding: 'async',
	...imageAttrs,
}) as unknown as T

/**
 * Calls back once when an element first comes near the viewport
 * @function
 * @param elem - Element to observe
 * @param onNear - Called once
 * @return Function that stops observing
 */
export const observeNearViewport = (elem: Element, onNear: () => void): (() => void) => {
	if(typeof IntersectionObserver === 'undefined') {
		onNear()
		return () => {}
	}
	const observer = new IntersectionObserver(entries => {
		if(!entries.some(entry => entry.isIntersecting)) return
		observer.disconnect()
		onNear()
	}, { rootMargin: VIEWPORT_NEAR_MARGIN })
	observer.observe(elem)
	return () => observer.disconnect()
}

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

/**
 * Gets the DOM event from a framework or Ark UI event: React's nativeEvent, Ark's detail.originalEvent, or the event itself
 * @function
 * @param event - Any event
 * @return DOM event, if there is one
 */
export const getDomEvent = (event: unknown): Event | undefined => {
	const eventLike = event as { nativeEvent?: unknown, detail?: { originalEvent?: unknown } } | null | undefined
	const domEvent = eventLike?.nativeEvent ?? eventLike?.detail?.originalEvent ?? event
	return typeof Event !== 'undefined' && domEvent instanceof Event ? domEvent : undefined
}

/**
 * Remembers the latest DOM event inside a modal, popover or drawer, since Ark UI's onOpenChange doesn't include one.
 * Record from the close button click, Escape, outside interactions and pointer down (drawer swipes), then take it in onOpenChange
 * @function
 * @return Functions to record an event and take (and clear) the latest one
 */
export const createOpenChangeEvents = () => {
	let latest: Event | undefined
	return {
		record: (event: unknown) => {
			latest = getDomEvent(event) ?? latest
		},
		take: (): Event | undefined => {
			const event = latest
			latest = undefined
			return event
		},
	}
}
