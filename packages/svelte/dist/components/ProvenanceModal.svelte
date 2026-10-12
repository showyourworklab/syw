<script lang="ts">
	import { getDataContext } from '../store/data.js'
	import { getI18nContext } from '../store/i18n.js'
	import { getUiContext } from '../store/ui.js'
	import Modal from './Modal.svelte'
	import Provenance from './Provenance.svelte'

	const {
		isProvenanceOpen,
		openProvenance,
		closeProvenance,
		closeExplainer
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

<Modal
	open={$isProvenanceOpen}
	title={getText($locale, 'provenance', 'toggle', $mediaType)}
	onOpenChange={handleOpenChange}
	className='ProvenanceModal'
>
	<Provenance />
</Modal>
