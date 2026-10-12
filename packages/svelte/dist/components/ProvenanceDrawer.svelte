<script lang="ts">
	import { classNames } from 'syw-common/helpers'
    import { getUiContext } from '../store/ui.js';
    import { getI18nContext } from '../store/i18n.js';
    import { getDataContext } from '../store/data.js';
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

<Drawer
	open={$isProvenanceOpen}
	title={getText($locale, 'provenance', 'toggle', $mediaType)}
	description=""
	direction={direction}
	onOpenChange={handleOpenChange}
	className={classNames('ProvenanceDrawer')}
>
	<Provenance />
</Drawer>