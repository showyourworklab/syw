<script lang="ts">
	import { untrack } from 'svelte'
    import { Tabs, useTabs } from '@ark-ui/svelte/tabs';
	import { classNames, getAvailableTabs } from 'syw-common/helpers/ui'
	import { getObjectValue } from 'syw-common/helpers/utils'
	import { MANIFEST_CONTENT_TAB_KEYS } from 'syw-common/constants/ui'
	import type { Manifest as ManifestData } from 'syw-common/types/data'
	import type { ManifestContentTabKey } from 'syw-common/types/components'
	import { getUiContext } from '$lib/store/ui.js'
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
		((manifest?.type?.key ? getObjectValue(manifest.type.key, MANIFEST_CONTENT_TAB_KEYS) : undefined) ?? []) as ManifestContentTabKey[]
	)

	const availableTabKeys = $derived(
		getAvailableTabs(tabKeys, manifest)
	)

	let tabValue = $state<string | undefined>(untrack(() =>
		availableTabKeys[0])
	)

	const tabs = useTabs(() => ({
		value: tabValue,
		onValueChange: (details: { value: string }) =>
			tabValue = details.value
	}))

	$effect(() => {
		const firstTabKey = availableTabKeys[0]
		if(firstTabKey && !availableTabKeys.includes(tabValue ?? '')) {
			tabValue = firstTabKey
		}
	})

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
