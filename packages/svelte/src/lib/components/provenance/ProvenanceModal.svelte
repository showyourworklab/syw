<script lang="ts">
	import { getDataContext } from '$lib/store/data.js'
	import { getI18nContext } from '$lib/store/i18n.js'
	import { getUiContext } from '$lib/store/ui.js'
	import Modal from '$lib/components/shared/Modal.svelte'
	import Provenance from '$lib/components/provenance/Provenance.svelte'

	const {
		isProvenanceOpen,
		openProvenance,
		closeProvenance,
		closeExplainer
	} = getUiContext()
	const { locale, getText } = getI18nContext()
	const { mediaType } = getDataContext()

	const handleOpenChange = (newOpen: boolean, event?: Event) => {
		if(newOpen) {
			openProvenance(event)
		} else {
			closeProvenance(event)
			closeExplainer(event)
		}
	}

</script>

<Modal
	open={$isProvenanceOpen}
	title={getText($locale, 'provenance', 'toggle', $mediaType)}
	onOpenChange={handleOpenChange}
	className='ProvenanceModal'
>
	<Provenance />
</Modal>
