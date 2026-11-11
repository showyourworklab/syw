<script lang="ts">
	import { onMount, onDestroy, untrack } from 'svelte'
	import type { HTMLAttributes } from 'svelte/elements'
	import 'syw-common/css/styles.css'
	import { classNames } from 'syw-common/helpers/ui'
	import { resolveMediaType, getDataEventType } from 'syw-common/helpers/data'
	import { VARIANT_DEFAULT } from 'syw-common/constants/ui'
	import { LOCALE_DEFAULT } from 'syw-common/constants/i18n'
	import { C2PA_DATA_DEFAULT, PHASE_KEYS } from 'syw-common/constants/data'
	import type { SywEmbedProps } from 'syw-common/types/embed'
	import type { SywData } from 'syw-common/types/data'
	import createC2paStore, { setC2paContext } from '../store/c2pa.js'
	import createDataStore, { setDataContext } from '../store/data.js'
	import createI18nStore, { setI18nContext } from '../store/i18n.js'
	import createUiStore, { setUiContext } from '../store/ui.js'
	import Figure from './figure/Figure.svelte'
	import ProvenanceExpand from './provenance/ProvenanceExpand.svelte'
	import ProvenanceModal from './provenance/ProvenanceModal.svelte'
	import ProvenancePopover from './provenance/ProvenancePopover.svelte'
	import ProvenanceDrawer from './provenance/ProvenanceDrawer.svelte'

	const {
		variant = VARIANT_DEFAULT,
		src = '',
		alt = '',
		caption = '',
		byline = '',
		mediaType: mediaTypeProp,
		locale = LOCALE_DEFAULT,
		c2paOptions = {},
		mapOptions = null,
		onEvent = undefined,
		class: className,
		...props
	}: SywEmbedProps & Omit<HTMLAttributes<HTMLDivElement>, 'class'> & { class?: string | null } = $props()

	const mediaType = $derived(mediaTypeProp)

	let mounted = $state(false)
	let elemRef: HTMLElement | null = $state(null)
	let prevSrc: string | null = $state(null)

	const c2paStore = createC2paStore()
	// Seed with initial props so SSR renders real data; the $effect below keeps it in sync
	const dataStore = createDataStore(untrack(() => ({ src, alt, caption, byline, mediaType })))
	const i18nStore = createI18nStore()
	const uiStore = createUiStore()

	setC2paContext(c2paStore)
	setDataContext(dataStore)
	setI18nContext(i18nStore)
	setUiContext(uiStore)

	const { c2pa } = c2paStore
	const { lang } = i18nStore
	const { phase } = dataStore
	const {
		isHoverImage,
		isProvenanceOpen,
	} = uiStore

	const classes = $derived(
		classNames(
			'App',
			`App_${$phase}`,
			`App_${variant}`,
			$isHoverImage ? 'App_hovered' : false,
			$isProvenanceOpen ? 'App_active' : false,
			className
		)
	)

	// Separate from other props so their changes don't replace a media type confirmed by the C2PA read
	$effect(() => {
		dataStore.setSrc(src)
		dataStore.setMediaType(resolveMediaType(src, mediaType))
	})

	$effect(() => {
		dataStore.setAlt(alt)
		dataStore.setCaption(caption)
		dataStore.setByline(byline)
	})

	$effect(() => {
		uiStore.setElem(elemRef)
		uiStore.setEventHandler(onEvent ?? null)
		uiStore.setVariant(variant)
		uiStore.setMapOptions(mapOptions)
	})

	$effect(() => {
		i18nStore.setLocale(locale)
	})

	$effect(() => {
		if (!mounted) return
		if(src === prevSrc) return
		prevSrc = src

		;(async () => {
			if(src) {
				// Clear the previous media's data so it isn't shown while the new media loads
				setC2paData({
					...C2PA_DATA_DEFAULT,
					phase: PHASE_KEYS.LOADING,
					mediaType: resolveMediaType(src, mediaType)
				})
			}
			let c2paInstance = $c2pa
			if (!c2paInstance) c2paInstance = await c2paStore.init(c2paOptions)
			const newData = await c2paStore.read({ src, mediaType })
			if(newData) setC2paData(newData)
		})()
	})

	// Sets C2PA data and fires its data event
	const setC2paData = (data: SywData) => {
		dataStore.setC2paData(data)
		const type = getDataEventType(data)
		if(type) uiStore.handleEvent(type, null, { ...data, src, alt, caption, byline })
	}

	onMount(() => {
		mounted = true
	})

	onDestroy(() => {
		c2paStore.dispose()
	})
</script>

<div
	{...props}
	lang={$lang}
	class={classes}
	bind:this={elemRef}
>
	<Figure />

	{#if variant === 'expand'}
		<ProvenanceExpand />
	{:else if variant === 'modal'}
		<ProvenanceModal />
	{:else if variant === 'popover'}
		<ProvenancePopover />
	{:else if variant === 'drawer-left'}
		<ProvenanceDrawer direction='left' />
	{:else if variant === 'drawer-right'}
		<ProvenanceDrawer direction='right' />
	{:else if variant === 'drawer-bottom'}
		<ProvenanceDrawer direction='bottom' />
	{/if}
</div>
