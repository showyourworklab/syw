<script lang="ts">
	import { getDataContext } from '../../store/data.js'
	import { getI18nContext } from '../../store/i18n.js'
	import { getUiContext } from '../../store/ui.js'
	import Popover from '../shared/Popover.svelte'
	import Provenance from './Provenance.svelte'

	const {
		isProvenanceOpen,
		openProvenance,
		closeProvenance,
		closeExplainer,
		elem
	} = getUiContext()
	const { locale, getText } = getI18nContext()
	const { mediaType } = getDataContext()

	const handleOpenChange = (newOpen: boolean) => {
		if(newOpen) {
			openProvenance()
		} else {
			closeProvenance()
			closeExplainer()
		}
	}

</script>

<Popover
	open={$isProvenanceOpen}
	title={getText($locale, 'provenance', 'toggle', $mediaType)}
	onOpenChange={handleOpenChange}
	positioning={{
		placement: 'right-start',
		offset: {
			// mainAxis: 12,
			// crossAxis: -12
		},
		getAnchorRect: () =>
			$elem?.querySelector('.Syw-ProvenanceToggle')?.getBoundingClientRect() ?? null
	}}
	className='ProvenancePopover'
>
	<Provenance />
</Popover>
