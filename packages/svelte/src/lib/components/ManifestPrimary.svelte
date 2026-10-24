<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import { MANIFEST_LOCATION_TYPES, MANIFEST_ACTIONS_TYPES } from 'syw-common/constants/ui'
	import type { ManifestPrimaryProps } from 'syw-common/types/components'
	import { getI18nContext } from '$lib/store/i18n.js'
	import ManifestPrimaryField from './ManifestPrimaryField.svelte'
	import ManifestLocation from './ManifestLocation.svelte'
	import ManifestActions from './ManifestActions.svelte'
	import ManifestSection from './ManifestSection.svelte'

	const { locale, getText } = getI18nContext()

	const {
		keys = [],
		manifest
	}: ManifestPrimaryProps = $props()

	const typeKey = $derived(manifest.type?.key ?? 'unknown')
	const showLocation = $derived(MANIFEST_LOCATION_TYPES.includes(typeKey))
	const showActions = $derived(MANIFEST_ACTIONS_TYPES.includes(typeKey))
</script>

<ManifestSection
	title={getText($locale, 'section', 'primary', manifest.type?.key ?? 'unknown')}
	className={classNames('ManifestPrimary')}
>
	<div
		class={classNames('ManifestPrimaryFields')}
	>
		{#each keys as key}
			<ManifestPrimaryField
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
