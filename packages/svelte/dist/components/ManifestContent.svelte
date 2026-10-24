<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import type { ManifestContentProps } from 'syw-common/types/components'
	import { getDataContext } from '../store/data.js'
	import ManifestContentTabs from './ManifestContentTabs.svelte'
	import ManifestContentTabsToggle from './ManifestContentTabsToggle.svelte'

	const {
		tabKeys = [],
		manifest,
	}: ManifestContentProps = $props()

	const { mediaType } = getDataContext()
</script>

<div
	class={classNames('ManifestContent')}
>
	{#if manifest?.type?.key !== "unknown_create"}
		<div
			class={classNames('ManifestContentInner')}
		>
			<ManifestContentTabsToggle
				keys={tabKeys}
				manifest={manifest}
				class={classNames('ManifestContentInnerTabsToggle')}
			/>
			<ManifestContentTabs
				keys={tabKeys}
				manifest={manifest}
			/>
		</div>
	{:else}
		There is no verifiable origin for this {mediaType}
	{/if}
</div>
