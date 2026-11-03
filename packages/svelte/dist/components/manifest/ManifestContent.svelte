<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import { MANIFEST_EMPTY_TYPE_KEYS } from 'syw-common/constants/ui'
	import type { ManifestContentProps } from 'syw-common/types/components'
	import ManifestEmpty from './ManifestEmpty.svelte'
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
	{#if !(manifest.type && MANIFEST_EMPTY_TYPE_KEYS.includes(manifest.type.key))}
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
		<ManifestEmpty
			manifest={manifest}
		/>
	{/if}
</div>
