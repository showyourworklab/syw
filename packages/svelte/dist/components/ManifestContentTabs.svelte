<script lang="ts">
	import { Tabs } from '@ark-ui/svelte/tabs'
	import { classNames, getAvailableTabs } from 'syw-common/helpers/ui'
	import type { ManifestContentTabsProps } from 'syw-common/types/components'
	import ManifestInfo from './ManifestInfo.svelte'
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
					<ManifestInfo
						manifest={manifest}
					/>
				{:else if key === "image"}
					<ManifestImage
						manifest={manifest}
					/>
				{/if}
			</div>
		</Tabs.Content>
	{/each}
</div>
