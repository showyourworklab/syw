<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import { formatCoordinates } from 'syw-common/helpers/map'
	import type { ManifestLocationProps } from 'syw-common/types/components'
	import { getI18nContext } from '../../store/i18n.js'
	import Detail from '../shared/Detail.svelte'
	import DetailToggle from '../shared/DetailToggle.svelte'
	import Collapse from '../shared/Collapse.svelte'
	import Map from '../shared/Map.svelte'

	const { locale, getText } = getI18nContext()

	const { manifest }: ManifestLocationProps = $props()

	let mapOpen = $state(false)
	// Mount the map on first open, then keep it so it isn't rebuilt on every toggle
	let mapMounted = $state(false)

	const handleMapToggle = () => {
		mapMounted = true
		mapOpen = !mapOpen
	}
</script>

{#if manifest.location}
	<Detail
		title={getText($locale, 'location', 'coordinates')}
		titleTooltip={getText($locale, 'location', 'coordinates', 'definition')}
		className={classNames('ManifestLocation')}
	>
		<DetailToggle
			open={mapOpen}
			value={formatCoordinates(manifest.location)}
			subtitle={getText($locale, 'location', 'map', mapOpen ? 'hide' : 'show')}
			onToggle={handleMapToggle}
		/>
		<Collapse
			open={mapOpen}
		>
			{#if mapMounted}
				<Map
					location={manifest.location}
				/>
			{/if}
		</Collapse>
	</Detail>
{/if}
