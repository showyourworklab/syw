<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import { MANIFEST_LOCATION_TYPES, MANIFEST_ACTIONS_TYPES } from 'syw-common/constants/ui'
	import type { ManifestSectionPrimaryProps } from 'syw-common/types/components'
	import { getI18nContext } from '../../store/i18n.js'
	import ManifestSectionPrimaryDetail from './ManifestSectionPrimaryDetail.svelte'
	import ManifestLocation from './ManifestLocation.svelte'
	import ManifestActions from './ManifestActions.svelte'
	import ManifestSection from './ManifestSection.svelte'

	const { locale, getText } = getI18nContext()

	const {
		keys = [],
		manifest
	}: ManifestSectionPrimaryProps = $props()

	const typeKey = $derived(manifest.type?.key ?? 'unknown')
	const showLocation = $derived(MANIFEST_LOCATION_TYPES.includes(typeKey))
	const showActions = $derived(MANIFEST_ACTIONS_TYPES.includes(typeKey))
</script>

<ManifestSection
	title={getText($locale, 'section', 'primary', manifest.type?.key ?? 'unknown')}
	className={classNames('ManifestSectionPrimary')}
>
	<div
		class={classNames('ManifestSectionPrimaryDetails')}
	>
		{#each keys as key}
			<ManifestSectionPrimaryDetail
				type={key}
				manifest={manifest}
			/>
		{/each}
		{#if showLocation}
			<ManifestLocation
				manifest={manifest}
			/>
		{/if}
		{#if showActions}
			<ManifestActions
				manifest={manifest}
			/>
		{/if}
	</div>
</ManifestSection>
