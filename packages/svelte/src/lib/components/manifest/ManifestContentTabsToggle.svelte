<script lang="ts">
	import { Tabs } from '@ark-ui/svelte/tabs'
	import { classNames, getAvailableTabs } from 'syw-common/helpers/ui'
	import type { ManifestContentTabsToggleProps } from 'syw-common/types/components'
	import { getI18nContext } from '$lib/store/i18n.js'

	const {
		keys = [],
		manifest,
		class: className
	}: ManifestContentTabsToggleProps & { class?: string | null } = $props()

	const { locale, getText } = getI18nContext()

	const availableTabs = $derived(() =>
		getAvailableTabs(keys, manifest)
	)

</script>

<div
	class={classNames(
		'ManifestContentTabsToggle',
		className
	)}
>
	<Tabs.List
		class={classNames('ManifestContentTabsToggleList')}
	>
		{#each keys as key}
			<Tabs.Trigger
				value={key}
				disabled={!availableTabs().includes(key)}
				class={classNames('ManifestContentTabsToggleTrigger')}
			>
				{getText($locale, "tab", key)}
			</Tabs.Trigger>
		{/each}
		<Tabs.Indicator
			class={classNames('ManifestContentTabsToggleListIndicator')}
		/>
	</Tabs.List>
</div>
