<script lang="ts">
	import { classNames } from 'syw-common/helpers'
	import type { ActionsProps } from 'syw-common/types/components'
	import { getI18nContext } from '$lib/store/i18n.js'
    import Tooltip from './Tooltip.svelte';
    import Icon from './Icon.svelte';

	const { actions }: ActionsProps = $props()
	const { locale, getText } = getI18nContext()
</script>

<div
	class={classNames('Actions')}
>
	<ul
		class={classNames('ActionsList')}
	>
		{#each actions as action}
			<li
				class={classNames('ActionsListItem')}
			>
				<span>
					{getText($locale, 'action', action)}
				</span>
				<Tooltip
					content={getText($locale, "action", action, "definition")}
				>
					<Icon
						type="info"
						className={classNames('ActionsListItemTooltipIcon')}
					/>
				</Tooltip>
			</li>
		{/each}
	</ul>
</div>