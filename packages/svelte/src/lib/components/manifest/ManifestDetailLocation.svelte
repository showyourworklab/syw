<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import { formatCoordinates } from 'syw-common/helpers/map'
	import type { ManifestDetailLocationProps } from 'syw-common/types/components'
	import { getI18nContext } from '$lib/store/i18n.js'
	import ManifestDetail from '$lib/components/manifest/ManifestDetail.svelte'
	import Map from '$lib/components/shared/Map.svelte'

	const { locale, getText } = getI18nContext()

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
		className={classNames('ManifestDetailLocation')}
		open={mapOpen}
		value={formatCoordinates(manifest.location.value)}
		trust={manifest.location.trust}
		prompt={getText($locale, 'location', 'map', mapOpen ? 'hide' : 'show')}
		onToggle={handleMapToggle}
	>
		{#if mapMounted}
			<Map
				location={manifest.location.value}
			/>
		{/if}
	</ManifestDetail>
{/if}
