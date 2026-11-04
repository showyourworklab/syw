<script lang="ts">
	import { classNames, getManifestDisplayActions } from 'syw-common/helpers/ui'
	import { isIptcDigitalSourceTypeAi } from 'syw-common/helpers/iptc'
	import type { ManifestDetailActionsProps } from 'syw-common/types/components'
	import { getI18nContext } from '$lib/store/i18n.js'
	import ManifestDetail from '$lib/components/manifest/ManifestDetail.svelte'
	import Tooltip from '$lib/components/shared/Tooltip.svelte'

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
		definition={getText($locale, 'actions', 'definition')}
		className={classNames('ManifestDetailActions')}
		open={listOpen}
		value={getText($locale, 'actions', hasAi ? 'ai' : 'human')}
		prompt={getText($locale, 'actions', 'list', listOpen ? 'hide' : 'show')}
		onToggle={() => listOpen = !listOpen}
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
	</ManifestDetail>
{/if}
