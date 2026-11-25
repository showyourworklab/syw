import { getContext, setContext } from 'svelte'
import { writable, get } from 'svelte/store'
import { MediaQuery } from 'svelte/reactivity'
import type { HTMLImgAttributes } from 'svelte/elements'
import { MEDIA_QUERIES, VARIANT_DEFAULT } from 'syw-common/constants/ui'
import type { Manifest } from 'syw-common/types/data'
import type { MapOptions, MediaQueryKey, UiEventData, UiEventHandler, Variant } from 'syw-common/types/ui'

const UI_CONTEXT_KEY = Symbol('ui')

export type SywImageAttrs = Omit<HTMLImgAttributes, 'src' | 'alt'>

/**
 * Whether a named media query currently matches, read from its current value
 * @param key - Media query name, like 'sm'
 * @return Media query, false when rendered on the server
 */
export const useMediaQuery = (key: MediaQueryKey) => new MediaQuery(MEDIA_QUERIES[key], false)

export default function createUiStore(initialImageAttrs: SywImageAttrs = {}) {

	const elem = writable<HTMLElement | null>(null)
	const variant = writable<Variant | string>(VARIANT_DEFAULT)
	const mapOptions = writable<MapOptions>(null)
	const imageAttrs = writable<SywImageAttrs>(initialImageAttrs)
	const isProvenanceOpen = writable(false)
	const isExplainerOpen = writable(false)
	const openManifests = writable<Record<string, Manifest>>({})
	const eventHandler = writable<UiEventHandler | null>(null)

	const setElem = (value: HTMLElement | null) => {
		elem.set(value)
	}

	const setVariant = (value: Variant | string) => {
		variant.set(value)
	}

	const setMapOptions = (value: MapOptions) => {
		mapOptions.set(value)
	}

	const setImageAttrs = (value: SywImageAttrs) => {
		imageAttrs.set(value)
	}

	const handleEvent = (type: string, event: unknown, data?: UiEventData) => {
		const eventHandlerFunc = get(eventHandler)
		if(typeof eventHandlerFunc === "function") eventHandlerFunc(type, event as Event | null | undefined, data)
	}

	// Each open/close event is only reported when the state actually changes
	const openProvenance = (event?: unknown) => {
		if(get(isProvenanceOpen)) return
		isProvenanceOpen.set(true)
		handleEvent("provenance.open", event)
	}
	const closeProvenance = (event?: unknown) => {
		if(!get(isProvenanceOpen)) return
		isProvenanceOpen.set(false)
		openManifests.set({})
		handleEvent("provenance.close", event)
	}

	const openExplainer = (event?: unknown) => {
		if(get(isExplainerOpen)) return
		isExplainerOpen.set(true)
		handleEvent("explainer.open", event)
	}
	const closeExplainer = (event?: unknown) => {
		if(!get(isExplainerOpen)) return
		isExplainerOpen.set(false)
		handleEvent("explainer.close", event)
	}

	const openManifest = (event: unknown, manifest: Manifest) => {
		const newOpenManifests = Object.assign(get(openManifests), {})
		newOpenManifests[String(manifest.id)] = manifest
		openManifests.set(newOpenManifests)
		handleEvent("manifest.open", event, manifest)
	}
	const closeManifest = (event: unknown, manifest: Manifest) => {
		const newOpenManifests = Object.assign(get(openManifests), {})
		delete newOpenManifests[String(manifest.id)]
		openManifests.set(newOpenManifests)
		handleEvent("manifest.close", event, manifest)
	}

	const setEventHandler = (val: UiEventHandler | null) => {
		eventHandler.set(val)
	}

	return {
		elem,
		variant,
		mapOptions,
		imageAttrs,
		isProvenanceOpen,
		isExplainerOpen,
		openManifests,
		eventHandler,
		setElem,
		setVariant,
		setMapOptions,
		setImageAttrs,
		openProvenance,
		closeProvenance,
		openExplainer,
		closeExplainer,
		openManifest,
		closeManifest,
		setEventHandler,
		handleEvent,
	}
}

export type UiStore = ReturnType<typeof createUiStore>

export const setUiContext = (store: UiStore) => setContext(UI_CONTEXT_KEY, store)
export const getUiContext = () => getContext<UiStore>(UI_CONTEXT_KEY)
