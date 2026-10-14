import { getContext, setContext } from 'svelte'
import { writable, get } from 'svelte/store'
import { VARIANT_DEFAULT } from 'syw-common/constants/ui'
import type { Manifest } from 'syw-common/types/data'
import type { MapOptions, UiEventHandler, Variant } from 'syw-common/types/ui'

const UI_CONTEXT_KEY = Symbol('ui')

export default function createUiStore() {

	const elem = writable<HTMLElement | null>(null)
	const variant = writable<Variant | string>(VARIANT_DEFAULT)
	const mapOptions = writable<MapOptions>(null)
	const isHoverImage = writable(false)
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

	const handleEvent: UiEventHandler = (type, event, ...args) => {
		const eventHandlerFunc = get(eventHandler)
		if(typeof eventHandlerFunc === "function") eventHandlerFunc(type, event, ...args)
	}

	const hoverImage = (event?: unknown) => {
		isHoverImage.set(true)
		handleEvent("image.hover", event)
	}
	const unhoverImage = (event?: unknown) => {
		isHoverImage.set(false)
		handleEvent("image.unhover", event)
	}

	const openProvenance = (event?: unknown) => {
		isProvenanceOpen.set(true)
		handleEvent("provenance.open", event)
	}
	const closeProvenance = (event?: unknown) => {
		isProvenanceOpen.set(false)
		openManifests.set({})
		handleEvent("provenance.close", event)
	}

	const openExplainer = (event?: unknown) => {
		isExplainerOpen.set(true)
		handleEvent("explainer.open", event)
	}
	const closeExplainer = (event?: unknown) => {
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
		isHoverImage,
		isProvenanceOpen,
		isExplainerOpen,
		openManifests,
		eventHandler,
		setElem,
		setVariant,
		setMapOptions,
		hoverImage,
		unhoverImage,
		openProvenance,
		closeProvenance,
		openExplainer,
		closeExplainer,
		openManifest,
		closeManifest,
		setEventHandler,
	}
}

export type UiStore = ReturnType<typeof createUiStore>

export const setUiContext = (store: UiStore) => setContext(UI_CONTEXT_KEY, store)
export const getUiContext = () => getContext<UiStore>(UI_CONTEXT_KEY)
