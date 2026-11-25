import type { MapOptions } from 'maplibre-gl'

export const MAP_ZOOM = 5
export const MAP_STYLE = 'https://tiles.openfreemap.org/styles/bright'
export const MAP_PROPS: Partial<MapOptions> = {
	zoom: 10,
	style: MAP_STYLE,
}
export const MAP_LABEL_LAYERS = [
	'label_other',
	'label_village',
	'label_town',
	'label_state',
	'label_city',
	'label_city_capital',
	'label_country_3',
	'label_country_2',
	'label_country_1',
]
export const MAP_SOURCE_ID = 'location-source'
export const MAP_LAYER_ID = 'location-layer'