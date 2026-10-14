<script lang="ts">
    import { Tabs, useTabs } from '@ark-ui/svelte/tabs';
	import { classNames, getAvailableTabs } from 'syw-common/helpers/ui'
	import { getObjectValue } from 'syw-common/helpers/utils'
	import { MANIFEST_CONTENT_TAB_KEYS } from 'syw-common/constants/ui'
	import type { Manifest as ManifestData, ManifestFieldKey } from 'syw-common/types/data'
	import { getUiContext } from '../store/ui.js'
	import Collapse from './Collapse.svelte'
	import ManifestPreview from './ManifestPreview.svelte'
    import ManifestContent from './ManifestContent.svelte';

	const { openManifests } = getUiContext();

	const {
		manifest,
		previewRef,
	}: {
		manifest: ManifestData
		previewRef?: ((el: HTMLElement | null) => void) | null
	} = $props()

	const open = $derived(String(manifest.id) in $openManifests)

	const tabKeys = $derived(
		((manifest?.type?.key ? getObjectValue(manifest.type.key, MANIFEST_CONTENT_TAB_KEYS) : undefined) ?? []) as ManifestFieldKey[]
	)

	const availableTabKeys = $derived(
		getAvailableTabs(tabKeys, manifest)
	)

	const tabs = useTabs(() => ({
		defaultValue: availableTabKeys[0]
	}))

	const classes = $derived(
		classNames(
			'Manifest',
			open ? 'Manifest_open' : false,
		)
	)
</script>

<div
	class={classes}
>
	<div
		class={classNames('ManifestInner')}
	>
		<Tabs.RootProvider
			value={tabs}
		>
			<ManifestPreview
				open={open}
				manifest={manifest}
				tabKeys={tabKeys}
				previewRef={previewRef}
			/>
			<Collapse
				open={open}
			>
				<ManifestContent
					manifest={manifest}
					tabKeys={tabKeys}
				/>
			</Collapse>
		</Tabs.RootProvider>
	</div>
</div>
