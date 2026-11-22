<script lang="ts">
	import { classNames, getManifestDisplayActions } from 'syw-common/helpers/ui'
	import { isIptcDigitalSourceTypeAi } from 'syw-common/helpers/iptc'
	import type { ManifestDetailActionsProps } from 'syw-common/types/components'
	import { getI18nContext } from '../../store/i18n.js'
	import ManifestDetail from './ManifestDetail.svelte'
	import ManifestDetailActionsItem from './ManifestDetailActionsItem.svelte'

	const { locale, getText } = getI18nContext()

	const { manifest }: ManifestDetailActionsProps = $props()

	const actions = $derived(getManifestDisplayActions(manifest))
	const actionsIncludeAi = $derived(actions.some(action => isIptcDigitalSourceTypeAi(action.iptc)))
</script>

{#if actions.length}
	<ManifestDetail
		title={getText($locale, 'actions')}
		titleIcon="actions"
		trust={manifest.actions?.trust}
		className={classNames('ManifestDetailActions')}
		value={getText($locale, 'actions', actionsIncludeAi ? 'ai' : 'human')}
	>
		<ul
			class={classNames('ManifestDetailActionsList')}
		>
			{#each actions as action}
				<ManifestDetailActionsItem
					action={action}
				/>
			{/each}
		</ul>
	</ManifestDetail>
{/if}
