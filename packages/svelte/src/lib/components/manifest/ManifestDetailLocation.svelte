<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import { formatCoordinates } from 'syw-common/helpers/map'
	import type { ManifestDetailLocationProps } from 'syw-common/types/components'
	import { getI18nContext } from '$lib/store/i18n.js'
	import { getDataContext } from '$lib/store/data.js'
	import ManifestDetail from '$lib/components/manifest/ManifestDetail.svelte'
	import DetailToggle from '$lib/components/shared/DetailToggle.svelte'
	import Collapse from '$lib/components/shared/Collapse.svelte'
	import Map from '$lib/components/shared/Map.svelte'

	const { locale, getText, getMediaText } = getI18nContext()
	const { mediaType } = getDataContext()

	const { manifest }: ManifestDetailLocationProps = $props()

	let mapOpen = $state(false)
	// Mount the map on first open, then keep it so it isn't rebuilt on every toggle
	let mapMounted = $state(false)

	const handleMapToggle = () => {
		mapMounted = true
		mapOpen = !mapOpen
	}
</script>

{#if manifest.location}
	<ManifestDetail
		title={getText($locale, 'location', 'coordinates')}
		titleIcon="location"
		titleTooltip={getMediaText($locale, $mediaType, 'location', 'coordinates', 'definition')}
		className={classNames('ManifestDetailLocation')}
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
	</ManifestDetail>
{/if}
