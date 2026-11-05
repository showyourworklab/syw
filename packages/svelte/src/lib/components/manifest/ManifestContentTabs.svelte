<script lang="ts">
	import { Tabs } from '@ark-ui/svelte/tabs'
	import { classNames, getAvailableTabs } from 'syw-common/helpers/ui'
	import type { ManifestContentTabsProps } from 'syw-common/types/components'
	import ManifestInfo from '$lib/components/manifest/ManifestInfo.svelte'
	import ManifestImage from '$lib/components/manifest/ManifestImage.svelte'
	import ManifestDetailDefinition from '$lib/components/manifest/ManifestDetailDefinition.svelte'
	import { getI18nContext } from '$lib/store/i18n.js'
	import { getDataContext } from '$lib/store/data.js'

	const { locale, getText } = getI18nContext()
	const { mediaType } = getDataContext()

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
					<div
						class={classNames('ManifestContentTabsImage')}
					>
						<ManifestImage
							manifest={manifest}
						/>
						{#if manifest.thumbnail}
							<ManifestDetailDefinition>
								{getText($locale, 'thumbnail', 'definition', $mediaType)}
							</ManifestDetailDefinition>
						{/if}
					</div>
				{/if}
			</div>
		</Tabs.Content>
	{/each}
</div>
