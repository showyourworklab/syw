<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import { MANIFEST_EMPTY_TYPE_KEYS } from 'syw-common/constants/ui'
	import { useMediaQuery } from '$lib/store/ui.js'
	import type { ManifestContentProps } from 'syw-common/types/components'
	import ManifestEmpty from '$lib/components/manifest/ManifestEmpty.svelte'
	import ManifestContentTabs from '$lib/components/manifest/ManifestContentTabs.svelte'
	import ManifestContentTabsToggle from '$lib/components/manifest/ManifestContentTabsToggle.svelte'

	const {
		tabKeys = [],
		manifest,
	}: ManifestContentProps = $props()

	const isSm = useMediaQuery('sm')
</script>

<div
	class={classNames('ManifestContent')}
>
	{#if !(manifest.type && MANIFEST_EMPTY_TYPE_KEYS.includes(manifest.type.key))}
		<div
			class={classNames('ManifestContentInner')}
		>
			{#if isSm.current}
				<ManifestContentTabsToggle
					keys={tabKeys}
					manifest={manifest}
					class={classNames('ManifestContentInnerTabsToggle')}
				/>
			{/if}
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
