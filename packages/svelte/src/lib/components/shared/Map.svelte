<script lang="ts">
    import { untrack } from 'svelte';
	import MapLibre from 'maplibre-gl'
	import { classNames } from 'syw-common/helpers/ui'
	import { getLangFromLocale } from 'syw-common/helpers/i18n'
	import { createMapLayer, createMapSource, updateMapLang } from 'syw-common/helpers/map'
	import { MAP_PROPS, MAP_SOURCE_ID } from 'syw-common/constants/map'
	import type { MapProps } from 'syw-common/types/components'
	import { getI18nContext } from '$lib/store/i18n.js'
	import { getUiContext } from '$lib/store/ui.js'
	import Loader from '$lib/components/shared/Loader.svelte'

	const id = $props.id();
	const { locale } = getI18nContext()
	const { mapOptions } = getUiContext()
	let map: MapLibre.Map | null = $state(null)
	let loaded = $state(false)
	let container: HTMLDivElement | undefined = $state()

	const { location }: Pick<MapProps, 'location'> = $props()

	$effect(() => {
		const { lat, lng } = location
		const options = untrack(() => $mapOptions)
		const el = container
		if(!el) return
		let mapInstance: MapLibre.Map | null = null
		// The map is mounted while its collapse is still hidden (0x0),
		// so wait for a real size before creating it or it centers wrong
		const createMap = () => {
			try {
				mapInstance = new MapLibre.Map({
					container: classNames(id),
					center: [lng, lat],
					// interactive: false,
					...MAP_PROPS,
					...options
				})
				// mapInstance.addControl(new MapLibre.AttributionControl({
				// 	compact: true
				// }))
				map = mapInstance
				mapInstance.on('load', () => {
					const mapSource = createMapSource(lng, lat)
					const mapLayer = createMapLayer()
					mapInstance?.addSource(MAP_SOURCE_ID, mapSource)
					mapInstance?.addLayer(mapLayer)
					loaded = true
				})
			} catch(error) {
				console.error(error)
			}
		}
		const observer = new ResizeObserver(() => {
			if(!el.clientWidth || !el.clientHeight) return
			observer.disconnect()
			createMap()
		})
		observer.observe(el)
		return () => {
			observer.disconnect()
			mapInstance?.remove()
			map = null
			loaded = false
		}
	})

	$effect(() => {
		if(!loaded) return
		const lang = getLangFromLocale($locale)
		updateMapLang(untrack(() => map), lang)
	})

</script>

<figure
	class={classNames('Map')}
>
	<div
		id={classNames(id)}
		bind:this={container}
		class={classNames('MapContainer')}
	>
	</div>
	{#if !loaded}
		<Loader
			loading={true}
			className={classNames('MapLoader')}
		/>
	{/if}
</figure>
