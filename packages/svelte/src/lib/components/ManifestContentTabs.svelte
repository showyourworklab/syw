<script lang="ts">
	import { Tabs } from '@ark-ui/svelte/tabs'
	import { classNames, getAvailableTabs } from 'syw-common/helpers/ui'
	import type { ManifestContentTabsProps } from 'syw-common/types/components'
	import Map from './Map.svelte'
	import Actions from './Actions.svelte'
	import Icon from './Icon.svelte'

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
				{#if key === "thumbnail"}
					<div
						class={classNames(
							'ManifestContentTabsThumbnail',
							!manifest?.thumbnail ? 'ManifestContentTabsThumbnail_missing' : null,
						)}
					>
						{#if manifest?.thumbnail}
							<img
								alt=''
								src={manifest?.thumbnail}
								class={classNames('ManifestContentTabsThumbnailImage')}
							/>
						{:else}
							<Icon type="missing" />
						{/if}
					</div>
				{:else if key === "location" && manifest?.location}
					<Map
						location={manifest?.location}
					/>
				{:else if key === "actions"}
					<Actions
						actions={manifest?.actions ?? []}
					/>
				{/if}
			</div>
		</Tabs.Content>
	{/each}
</div>
