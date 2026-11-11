import { useState } from 'react'
import { classNames } from 'syw-common/helpers/ui'
import { formatCoordinates } from 'syw-common/helpers/map'
import type { ManifestDetailLocationProps } from 'syw-common/types/components'
import { useI18nContext, useDataContext } from '$src/context'
import ManifestDetail from '$src/components/manifest/ManifestDetail'
import Map from '$src/components/shared/Map'

function ManifestDetailLocation({ manifest }: ManifestDetailLocationProps) {
	const { getText } = useI18nContext()
	const { mediaType } = useDataContext()
	const [mapOpen, setMapOpen] = useState(false)
	// Mount the map on first open, then keep it so it isn't rebuilt on every toggle
	const [mapMounted, setMapMounted] = useState(false)

	if(!manifest.location) return null

	const handleMapToggle = () => {
		setMapMounted(true)
		setMapOpen(!mapOpen)
	}

	return (
		<ManifestDetail
			title={getText('location', 'coordinates')}
			titleIcon="location"
			definition={getText('location', 'coordinates', 'definition', mediaType)}
			className={classNames('ManifestDetailLocation')}
			open={mapOpen}
			value={formatCoordinates(manifest.location.value)}
			trust={manifest.location.trust}
			prompt={getText('location', 'map', mapOpen ? 'hide' : 'show')}
			onToggle={handleMapToggle}
		>
			{mapMounted ?
				<Map
					location={manifest.location.value}
				/>
			: null}
		</ManifestDetail>
	)
}

export default ManifestDetailLocation
