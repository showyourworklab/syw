<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import { MANIFEST_PRIMARY_KEYS } from 'syw-common/constants/ui'
	import type { ManifestContentProps } from 'syw-common/types/components'
    import ManifestTrust from './ManifestTrust.svelte';
	import ManifestTable from './ManifestTable.svelte'
	import ManifestIdentity from './ManifestIdentity.svelte'
	import ManifestContentTabs from './ManifestContentTabs.svelte'
	import ManifestContentTabsToggle from './ManifestContentTabsToggle.svelte'

	const {
		tabKeys = [],
		manifest,
	}: ManifestContentProps = $props()
</script>

<div
	class={classNames('ManifestContent')}
>
	{#if manifest?.type?.key !== "unknown_create"}
		<div
			class={classNames('ManifestContentInner')}
		>
			<div
				class={classNames('ManifestContentPrimary')}
			>
				<ManifestTable
					keys={MANIFEST_PRIMARY_KEYS}
					manifest={manifest}
				/>
				<ManifestTrust
					manifest={manifest}
				/>
				<ManifestIdentity
					manifest={manifest}
				/>
			</div>
			<div
				class={classNames('ManifestContentSecondary')}
			>
				<ManifestContentTabsToggle
					keys={tabKeys}
					manifest={manifest}
					class={classNames('ManifestContentSecondaryTabsToggle')}
				/>
				<ManifestContentTabs
					keys={tabKeys}
					manifest={manifest}
				/>
			</div>
		</div>
	{:else}
		<ManifestTrust
			manifest={manifest}
		/>
	{/if}
</div>
