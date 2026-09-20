<script>
	import { classNames } from 'syw-common/helpers'
    import { getUiContext } from '$lib/store/ui.js';
    import { getI18nContext } from '$lib/store/i18n.js';
	import Drawer from './Drawer.svelte'
	import Provenance from './Provenance.svelte'

	const {
		direction
	} = $props()
	
	const {
		isProvenanceOpen,
		openProvenance,
		closeProvenance,
		closeExplainer
	} = getUiContext()
	const {
		locale,
		getText
	} = getI18nContext()

	const handleOpenChange = (newOpen, event) => {
		const originalEvent = event
		if(newOpen) {
			openProvenance(originalEvent)
		} else {
			closeProvenance(originalEvent)
			closeExplainer(originalEvent)
		}
	}

</script>

<Drawer
	open={$isProvenanceOpen}
	title={getText($locale, 'provenance', 'toggle')}
	direction={direction}
	onOpenChange={handleOpenChange}
	className={classNames('ProvenanceDrawer')}
>
	<Provenance />
</Drawer>