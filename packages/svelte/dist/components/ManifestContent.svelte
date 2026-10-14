<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import { MANIFEST_PRIMARY_KEYS } from 'syw-common/constants/ui'
	import type { ManifestContentProps } from 'syw-common/types/components'
    import Trust from './Trust.svelte';
	import ManifestTable from './ManifestTable.svelte'
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
	<Trust
		manifest={manifest}
	/>
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
</div>
