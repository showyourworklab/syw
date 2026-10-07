<script lang="ts">
	import { getI18nContext } from '$lib/store/i18n.js'
	import { getUiContext } from '$lib/store/ui.js'
	import Modal from './Modal.svelte'
	import Provenance from './Provenance.svelte'

	const {
		isProvenanceOpen,
		openProvenance,
		closeProvenance,
		closeExplainer
	} = getUiContext()
	const { locale, getText } = getI18nContext()

	const handleOpenChange = (newOpen: boolean) => {
		if(newOpen) {
			openProvenance()
		} else {
			closeProvenance()
			closeExplainer()
		}
	}

</script>

<Modal
	open={$isProvenanceOpen}
	title={getText($locale, 'provenance', 'toggle')}
	onOpenChange={handleOpenChange}
	className='ProvenanceModal'
>
	<Provenance />
</Modal>
