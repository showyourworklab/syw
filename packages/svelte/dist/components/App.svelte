<script lang="ts">
	import { onMount, onDestroy } from 'svelte'
	import type { HTMLAttributes } from 'svelte/elements'
	import 'syw-common/css/styles.css'
	import { classNames } from 'syw-common/helpers'
	import { VARIANT_DEFAULT } from 'syw-common/constants'
	import { LOCALE_DEFAULT } from 'syw-common/constants/i18n'
	import { C2PA_PHASES } from 'syw-common/constants/c2pa'
	import type { SywEmbedProps } from 'syw-common/types/embed'
	import createC2paStore, { setC2paContext } from '../store/c2pa.js'
	import createDataStore, { setDataContext } from '../store/data.js'
	import createI18nStore, { setI18nContext } from '../store/i18n.js'
	import createUiStore, { setUiContext } from '../store/ui.js'
	import Figure from './Figure.svelte'
	import Media from './Media.svelte'
	import Cutline from './Cutline.svelte'
	import Caption from './Caption.svelte'
	import ProvenanceModal from './ProvenanceModal.svelte'
	import ProvenanceExpand from './ProvenanceExpand.svelte'
	import ProvenanceDrawer from './ProvenanceDrawer.svelte'

	const {
		variant = VARIANT_DEFAULT,
		src = '',
		alt = '',
		caption = '',
		byline = '',
		locale = LOCALE_DEFAULT,
		c2paOptions = {},
		mapOptions = null,
		onEvent = undefined,
		class: className,
		...props
	}: SywEmbedProps & Omit<HTMLAttributes<HTMLDivElement>, 'class'> & { class?: string | null } = $props()

	let mounted = $state(false)
	let elemRef: HTMLElement | null = $state(null)
	let prevSrc: string | null = $state(null)

	const c2paStore = createC2paStore()
	const dataStore = createDataStore()
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

	$effect(() => {
		dataStore.setSrc(src)
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
			const newData = await c2paStore.read({ src })
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
	{:else if variant === 'drawer-left'}
		<ProvenanceDrawer direction='left' />
	{:else if variant === 'drawer-right'}
		<ProvenanceDrawer direction='right' />
	{:else if variant === 'drawer-bottom'}
		<ProvenanceDrawer direction='bottom' />
	{/if}
</div>
