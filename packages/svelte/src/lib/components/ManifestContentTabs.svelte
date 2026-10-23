<script lang="ts">
	import { Tabs } from '@ark-ui/svelte/tabs'
	import { classNames, getAvailableTabs } from 'syw-common/helpers/ui'
	import { MANIFEST_PRIMARY_KEYS } from 'syw-common/constants/ui'
	import type { ManifestContentTabsProps } from 'syw-common/types/components'
	import ManifestIdentity from './ManifestIdentity.svelte'
	import ManifestTable from './ManifestTable.svelte'
	import ManifestTrust from './ManifestTrust.svelte'
	import ManifestLocation from './ManifestLocation.svelte'
	import ManifestImage from './ManifestImage.svelte'

	const {
		manifest,
		keys = [],
	}: ManifestContentTabsProps = $props()

	const availableTabs = $derived(() =>
		getAvailableTabs(keys, manifest)
	)
</script>

<div
	class={classNames('ManifestContentTabs')}
>
	{#each availableTabs() as key}
		<Tabs.Content
			value={key}
			class={classNames(
				'ManifestContentTabsContent',
				`ManifestContentTabsContent_${key}`
			)}
		>
			<div
				class={classNames('ManifestContentTabsContentInner')}
			>
				{#if key === "info"}
					<div
						class={classNames('ManifestContentTabsColumn', 'ManifestContentTabsColumn_primary')}
					>
						<ManifestTable
							keys={MANIFEST_PRIMARY_KEYS}
							manifest={manifest}
						/>
						<ManifestLocation
							manifest={manifest}
						/>
					</div>
					<div
						class={classNames('ManifestContentTabsColumn', 'ManifestContentTabsColumn_secondary')}
					>
						<ManifestIdentity
							manifest={manifest}
						/>
						<ManifestTrust
							manifest={manifest}
						/>
					</div>
				{:else if key === "image"}
					<ManifestImage
						manifest={manifest}
					/>
				{/if}
			</div>
		</Tabs.Content>
	{/each}
</div>
