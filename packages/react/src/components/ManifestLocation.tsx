import { useState } from 'react'
import { classNames } from 'syw-common/helpers/ui'
import { formatCoordinates } from 'syw-common/helpers/map'
import type { ManifestLocationProps } from 'syw-common/types/components'
import { useI18nContext } from '$src/context'
import ManifestSection from './ManifestSection'
import Detail from './Detail'
import Collapse from './Collapse'
import Icon from './Icon'
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
		<ManifestSection
			title={getText('section', 'location')}
			className={classNames('ManifestLocation')}
		>
			<Detail
				title={getText('location', 'coordinates')}
				titleTooltip={getText('location', 'coordinates', 'definition')}
				className={classNames('ManifestLocationCoordinates')}
			>
				<div
					className={classNames('ManifestLocationCoordinatesInner')}
				>
					<span>
						{formatCoordinates(manifest.location)}
					</span>
					<button
						type="button"
						aria-expanded={mapOpen}
						className={classNames('ManifestLocationMapToggle')}
						onClick={handleMapToggle}
					>
						{getText('location', 'map', mapOpen ? 'hide' : 'show')}
						<Icon
							type={mapOpen ? 'up' : 'down'}
						/>
					</button>
				</div>
			</Detail>
			<Collapse
				open={mapOpen}
			>
				{mapMounted ?
					<Map
						location={manifest.location}
					/>
				: null}
			</Collapse>
		</ManifestSection>
	)
}

export default ManifestLocation
