import { useState } from 'react'
import { classNames } from 'syw-common/helpers/ui'
import { formatCoordinates } from 'syw-common/helpers/map'
import type { ManifestLocationProps } from 'syw-common/types/components'
import { useI18nContext } from '$src/context'
import Detail from './Detail'
import DetailToggle from './DetailToggle'
import Collapse from './Collapse'
import Map from './Map'

function ManifestLocation({ manifest }: ManifestLocationProps) {
	const { getText } = useI18nContext()
	const [mapOpen, setMapOpen] = useState(false)
	// Mount the map on first open, then keep it so it isn't rebuilt on every toggle
	const [mapMounted, setMapMounted] = useState(false)

	if(!manifest.location) return null

	const handleMapToggle = () => {
		setMapMounted(true)
		setMapOpen(!mapOpen)
	}

	return (
		<Detail
			title={getText('location', 'coordinates')}
			titleTooltip={getText('location', 'coordinates', 'definition')}
			className={classNames('ManifestLocation')}
		>
			<DetailToggle
				open={mapOpen}
				value={formatCoordinates(manifest.location)}
				subtitle={getText('location', 'map', mapOpen ? 'hide' : 'show')}
				onToggle={handleMapToggle}
			/>
			<Collapse
				open={mapOpen}
			>
				{mapMounted ?
					<Map
						location={manifest.location}
					/>
				: null}
			</Collapse>
		</Detail>
	)
}

export default ManifestLocation
