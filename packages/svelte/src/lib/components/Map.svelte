<script lang="ts">
    import { untrack } from 'svelte';
	import MapLibre from 'maplibre-gl'
	import { classNames } from 'syw-common/helpers'
	import { getLangFromLocale } from 'syw-common/helpers/i18n'
	import { createMapLayer, createMapSource, updateMapLang } from 'syw-common/helpers/map'
	import { MAP_PROPS, MAP_SOURCE_ID } from 'syw-common/constants/map'
	import type { MapProps } from 'syw-common/types/components'
	import { getI18nContext } from '$lib/store/i18n.js'
	import { getUiContext } from '$lib/store/ui.js'

	const id = $props.id();
	const { locale } = getI18nContext()
	const { mapOptions } = getUiContext()
	let map: MapLibre.Map | null = $state(null)
	let loaded = $state(false)

	const { location }: Pick<MapProps, 'location'> = $props()

	$effect(() => {
		const { lat, lng } = location
		const options = untrack(() => $mapOptions)
		let mapInstance: MapLibre.Map | null = null
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
		return () => {
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
		class={classNames('MapContainer')}
	>
	</div>
</figure>
