<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import { isIptcDigitalSourceTypeAi } from 'syw-common/helpers/iptc'
	import type { ManifestActionsProps } from 'syw-common/types/components'
	import { getI18nContext } from '$lib/store/i18n.js'
	import Detail from './Detail.svelte'
	import DetailToggle from './DetailToggle.svelte'
	import Collapse from './Collapse.svelte'
	import Tooltip from './Tooltip.svelte'
	import Icon from './Icon.svelte'

	const { locale, getText } = getI18nContext()

	const { manifest }: ManifestActionsProps = $props()

	let listOpen = $state(false)

	const hasAi = $derived(manifest.actions?.some(action => isIptcDigitalSourceTypeAi(action.iptc)) ?? false)
</script>

{#if manifest.actions?.length}
	<Detail
		title={getText($locale, 'actions')}
		titleTooltip={getText($locale, 'actions', 'definition')}
		className={classNames('ManifestActions')}
	>
		<DetailToggle
			open={listOpen}
			value={getText($locale, 'actions', hasAi ? 'ai' : 'human')}
			subtitle={getText($locale, 'actions', 'list', listOpen ? 'hide' : 'show')}
			onToggle={() => listOpen = !listOpen}
		/>
		<Collapse
			open={listOpen}
		>
			<ul
				class={classNames('ManifestActionsList')}
			>
				{#each manifest.actions as action}
					<li
						class={classNames('ManifestActionsListItem')}
					>
						<span>
							{getText($locale, 'action', action.key)}
						</span>
						{#if isIptcDigitalSourceTypeAi(action.iptc)}
							<span>
								{getText($locale, 'action', 'ai')}
							</span>
						{/if}
						<Tooltip
							content={getText($locale, 'action', action.key, 'definition')}
						>
							<Icon
								type="info"
								className={classNames('ManifestActionsListItemTooltipIcon')}
							/>
						</Tooltip>
					</li>
				{/each}
			</ul>
		</Collapse>
	</Detail>
{/if}
