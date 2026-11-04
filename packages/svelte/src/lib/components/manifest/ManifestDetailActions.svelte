<script lang="ts">
	import { classNames, getManifestDisplayActions } from 'syw-common/helpers/ui'
	import { isIptcDigitalSourceTypeAi } from 'syw-common/helpers/iptc'
	import type { ManifestDetailActionsProps } from 'syw-common/types/components'
	import { getI18nContext } from '$lib/store/i18n.js'
	import ManifestDetail from '$lib/components/manifest/ManifestDetail.svelte'
	import ManifestDetailActionsItem from '$lib/components/manifest/ManifestDetailActionsItem.svelte'

	const { locale, getText } = getI18nContext()

	const { manifest }: ManifestDetailActionsProps = $props()

	let listOpen = $state(false)

	const actions = $derived(getManifestDisplayActions(manifest))
	const actionsIncludeAi = $derived(actions.some(action => isIptcDigitalSourceTypeAi(action.iptc)))
</script>

{#if actions.length}
	<ManifestDetail
		title={getText($locale, 'actions')}
		titleIcon="actions"
		definition={getText($locale, 'actions', 'definition')}
		className={classNames('ManifestDetailActions')}
		open={listOpen}
		value={getText($locale, 'actions', actionsIncludeAi ? 'ai' : 'human')}
		prompt={getText($locale, 'actions', 'list', listOpen ? 'hide' : 'show')}
		onToggle={() => listOpen = !listOpen}
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
