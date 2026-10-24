<script lang="ts">
	import { getDataContext } from '../../store/data.js'
	import { getI18nContext } from '../../store/i18n.js'
	import { getUiContext } from '../../store/ui.js'
	import Modal from '../shared/Modal.svelte'
	import Provenance from './Provenance.svelte'

	const {
		isProvenanceOpen,
		openProvenance,
		closeProvenance,
		closeExplainer
	} = getUiContext()
	const { locale, getMediaText } = getI18nContext()
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
	title={getMediaText($locale, $mediaType, 'provenance', 'toggle')}
	onOpenChange={handleOpenChange}
	className='ProvenanceModal'
>
	<Provenance />
</Modal>
