<script lang="ts">
	import { classNames, getManifestDisplayActions } from 'syw-common/helpers/ui'
	import { isIptcDigitalSourceTypeAi } from 'syw-common/helpers/iptc'
	import type { ManifestDetailActionsProps } from 'syw-common/types/components'
	import { getI18nContext } from '../../store/i18n.js'
	import ManifestDetail from './ManifestDetail.svelte'
	import DetailToggle from '../shared/DetailToggle.svelte'
	import Collapse from '../shared/Collapse.svelte'
	import Tooltip from '../shared/Tooltip.svelte'

	const { locale, getText } = getI18nContext()

	const { manifest }: ManifestDetailActionsProps = $props()

	let listOpen = $state(false)

	const actions = $derived(getManifestDisplayActions(manifest))
	const hasAi = $derived(actions.some(action => isIptcDigitalSourceTypeAi(action.iptc)))
</script>

{#if actions.length}
	<ManifestDetail
		title={getText($locale, 'actions')}
		titleIcon="actions"
		titleTooltip={getText($locale, 'actions', 'definition')}
		className={classNames('ManifestDetailActions')}
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
				class={classNames('ManifestDetailActionsList')}
			>
				{#each actions as action}
					<li
						class={classNames('ManifestDetailActionsListItem')}
					>
						<Tooltip
							content={getText($locale, 'action', action.key, 'definition')}
						>
							<span>
								{getText($locale, 'action', action.key)}
							</span>
						</Tooltip>
						{#if isIptcDigitalSourceTypeAi(action.iptc)}
							<span>
								{getText($locale, 'action', 'ai')}
							</span>
						{/if}
					</li>
				{/each}
			</ul>
		</Collapse>
	</ManifestDetail>
{/if}
