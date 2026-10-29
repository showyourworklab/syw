import 'maplibre-gl/dist/maplibre-gl.css'
import { useEffect, useId, useRef, useState } from 'react'
import MapLibre from 'maplibre-gl'
import { classNames } from 'syw-common/helpers/ui'
import { getLangFromLocale } from 'syw-common/helpers/i18n'
import { createMapLayer, createMapSource, updateMapLang } from 'syw-common/helpers/map'
import { MAP_PROPS, MAP_SOURCE_ID } from 'syw-common/constants/map'
import type { MapProps } from 'syw-common/types/components'
import { useI18nContext } from '$src/context/i18n'
import { useUiContext } from '$src/context/ui'
import Loader from '$src/components/shared/Loader'
// TODO: https://maplibre.org/maplibre-gl-js/docs/examples/add-support-for-right-to-left-scripts/
const Map = ({
	location
}: MapProps) => {
	const id = useId()
	const { locale } = useI18nContext()
	const { mapOptions } = useUiContext()
	const [map, setMap] = useState<MapLibre.Map | null>(null)
	const [loaded, setLoaded] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)
	useEffect(() => {
		const container = containerRef.current
		if(!container) return
		let mapInstance: MapLibre.Map | null = null
		const createMap = () => {
			try {
				mapInstance = new MapLibre.Map({
					container: classNames(id),
					center: [location.lng, location.lat],
					// interactive: false,
					...MAP_PROPS,
					...(mapOptions ?? {})
				})
				// mapInstance.addControl(new MapLibre.AttributionControl({
				// 	compact: true
				// }))
				setMap(mapInstance)
				mapInstance.on('load', () => {
					const mapSource = createMapSource(location.lng, location.lat)
					const mapLayer = createMapLayer()
					mapInstance?.addSource(MAP_SOURCE_ID, mapSource)
					mapInstance?.addLayer(mapLayer)
					setLoaded(true)
				})
			} catch(error) {
				console.error(error)
			}
		}
		const observer = new ResizeObserver(() => {
			if(!container.clientWidth || !container.clientHeight) return
			observer.disconnect()
			createMap()
		})
		observer.observe(container)
		return () => {
			observer.disconnect()
			mapInstance?.remove()
			setMap(null)
			setLoaded(false)
		}
	}, [id, location.lng, location.lat])

	useEffect(() => {
		if(!loaded) return
		const lang = getLangFromLocale(locale)
		updateMapLang(map, lang)
	}, [map, locale, loaded])
	
	return (
		<figure
			className={classNames('Map')}
		>
			<div
				id={classNames(id)}
				ref={containerRef}
				className={classNames('MapContainer')}
			/>
			{!loaded ?
				<Loader
					loading={true}
					className={classNames('MapLoader')}
				/>
			: null}
		</figure>
	)
}

export default Map