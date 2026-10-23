<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import { formatCoordinates } from 'syw-common/helpers/map'
	import type { ManifestLocationProps } from 'syw-common/types/components'
	import { getI18nContext } from '$lib/store/i18n.js'
	import ManifestSection from './ManifestSection.svelte'
	import Detail from './Detail.svelte'
	import Collapse from './Collapse.svelte'
	import Icon from './Icon.svelte'
	import Map from './Map.svelte'

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
	<ManifestSection
		title={getText($locale, 'section', 'location')}
		className={classNames('ManifestLocation')}
	>
		<Detail
			title={getText($locale, 'location', 'coordinates')}
			titleTooltip={getText($locale, 'location', 'coordinates', 'definition')}
			className={classNames('ManifestLocationCoordinates')}
		>
			<div
				class={classNames('ManifestLocationCoordinatesInner')}
			>
				<span>
					{formatCoordinates(manifest.location)}
				</span>
				<button
					type="button"
					aria-expanded={mapOpen}
					class={classNames('ManifestLocationMapToggle')}
					onclick={handleMapToggle}
				>
					{getText($locale, 'location', 'map', mapOpen ? 'hide' : 'show')}
					<Icon
						type={mapOpen ? 'up' : 'down'}
					/>
				</button>
			</div>
		</Detail>
		<Collapse
			open={mapOpen}
		>
			{#if mapMounted}
				<Map
					location={manifest.location}
				/>
			{/if}
		</Collapse>
	</ManifestSection>
{/if}
