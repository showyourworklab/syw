<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import { isIptcDigitalSourceTypeAi } from 'syw-common/helpers/iptc'
	import type { ManifestDetailActionsItemProps } from 'syw-common/types/components'
	import { getI18nContext } from '../../store/i18n.js'
	import Collapse from '../shared/Collapse.svelte'
	import Icon from '../shared/Icon.svelte'

	const { locale, getText } = getI18nContext()

	const { action }: ManifestDetailActionsItemProps = $props()

	let open = $state(false)
</script>

<li
	class={classNames(
		'ManifestDetailActionsItem',
		open ? 'ManifestDetailActionsItem_open' : null,
	)}
>
	<button
		type="button"
		aria-expanded={open}
		class={classNames('ManifestDetailActionsItemToggle')}
		onclick={() => open = !open}
	>
		<span>
			{getText($locale, 'action', action.key)}
		</span>
		<Icon
			type={open ? 'up' : 'down'}
			className={classNames('ManifestDetailActionsItemToggleIcon')}
		/>
	</button>
	{#if isIptcDigitalSourceTypeAi(action.iptc)}
		<span
			class={classNames('ManifestDetailActionsItemAi')}
		>
			{getText($locale, 'action', 'ai')}
		</span>
	{/if}
	<Collapse
		open={open}
	>
		<p
			class={classNames('ManifestDetailActionsItemDefinition')}
		>
			{getText($locale, 'action', action.key, 'definition')}
		</p>
	</Collapse>
</li>
