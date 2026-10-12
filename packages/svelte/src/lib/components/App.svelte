<script lang="ts">
	import { onMount, onDestroy, untrack } from 'svelte'
	import type { HTMLAttributes } from 'svelte/elements'
	import 'syw-common/css/styles.css'
	import { classNames, resolveMediaType } from 'syw-common/helpers'
	import { VARIANT_DEFAULT } from 'syw-common/constants'
	import { LOCALE_DEFAULT } from 'syw-common/constants/i18n'
	import { C2PA_MEDIA_TYPES, C2PA_PHASES } from 'syw-common/constants/c2pa'
	import type { SywEmbedProps } from 'syw-common/types/embed'
	import createC2paStore, { setC2paContext } from '$lib/store/c2pa.js'
	import createDataStore, { setDataContext } from '$lib/store/data.js'
	import createI18nStore, { setI18nContext } from '$lib/store/i18n.js'
	import createUiStore, { setUiContext } from '$lib/store/ui.js'
	import Figure from './Figure.svelte'
	import Media from './Media.svelte'
	import Cutline from './Cutline.svelte'
	import Caption from './Caption.svelte'
	import ProvenanceExpand from './ProvenanceExpand.svelte'
	import ProvenanceModal from './ProvenanceModal.svelte'
	import ProvenancePopover from './ProvenancePopover.svelte'
	import ProvenanceDrawer from './ProvenanceDrawer.svelte'

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

	const mediaType = $derived(mediaTypeProp ?? C2PA_MEDIA_TYPES.UNKNOWN)

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
	const {
		isHoverImage,
		isProvenanceOpen,
	} = uiStore

	const classes = $derived(
		classNames(
			'App',
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
			dataStore.setPhase(C2PA_PHASES.LOADING)
			let c2paInstance = $c2pa
			if (!c2paInstance) c2paInstance = await c2paStore.init(c2paOptions)
			const newData = await c2paStore.read({ src, mediaType })
			if(newData) dataStore.setC2paData(newData)
		})()
	})

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
	<Figure>
		<Media />
		<Cutline />
		<Caption />
	</Figure>

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
