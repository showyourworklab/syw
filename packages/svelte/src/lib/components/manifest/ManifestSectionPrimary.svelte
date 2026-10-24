<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import { MANIFEST_LOCATION_TYPES, MANIFEST_ACTIONS_TYPES } from 'syw-common/constants/ui'
	import type { ManifestSectionPrimaryProps } from 'syw-common/types/components'
	import { getI18nContext } from '$lib/store/i18n.js'
	import ManifestDetailPrimary from '$lib/components/manifest/ManifestDetailPrimary.svelte'
	import ManifestDetailGenerator from '$lib/components/manifest/ManifestDetailGenerator.svelte'
	import ManifestDetailLocation from '$lib/components/manifest/ManifestDetailLocation.svelte'
	import ManifestDetailActions from '$lib/components/manifest/ManifestDetailActions.svelte'
	import ManifestSection from '$lib/components/manifest/ManifestSection.svelte'

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
	titleIcon="section_primary"
	className={classNames('ManifestSectionPrimary')}
>
	<div
		class={classNames('ManifestSectionPrimaryDetails')}
	>
		{#each keys as key}
			{#if key === 'generator'}
				<ManifestDetailGenerator
					manifest={manifest}
				/>
			{:else}
				<ManifestDetailPrimary
					type={key}
					manifest={manifest}
				/>
			{/if}
		{/each}
		{#if showLocation}
			<ManifestDetailLocation
				manifest={manifest}
			/>
		{/if}
		{#if showActions}
			<ManifestDetailActions
				manifest={manifest}
			/>
		{/if}
	</div>
</ManifestSection>
