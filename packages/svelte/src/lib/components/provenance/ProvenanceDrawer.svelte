<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
    import { getUiContext } from '$lib/store/ui.js';
    import { getI18nContext } from '$lib/store/i18n.js';
    import { getDataContext } from '$lib/store/data.js';
	import Drawer from '$lib/components/shared/Drawer.svelte'
	import Provenance from '$lib/components/provenance/Provenance.svelte'

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
		getMediaText
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
	title={getMediaText($locale, $mediaType, 'provenance', 'toggle')}
	description=""
	direction={direction}
	onOpenChange={handleOpenChange}
	className={classNames('ProvenanceDrawer')}
>
	<Provenance />
</Drawer>