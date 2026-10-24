import { classNames } from 'syw-common/helpers/ui'
import { useUiContext } from '$src/context'
import Modal from '$src/components/shared/Modal'
import Provenance from '$src/components/provenance/Provenance'
import { useMediaText } from '$src/hooks'

const ProvenanceModal = () => {
	const {
		isProvenanceOpen,
		openProvenance,
		closeProvenance,
		closeExplainer
	} = useUiContext()
	const getMediaText = useMediaText()

	const handleOpenChange = (newOpen: boolean) => {
		if(newOpen) {
			openProvenance()
		} else {
			closeProvenance()
			closeExplainer()
		}
	}

	return (
		<Modal
			open={isProvenanceOpen}
			title={getMediaText("provenance", "toggle") ?? undefined}
			onOpenChange={handleOpenChange}
			className={classNames('ProvenanceModal')}
		>
			<Provenance />
		</Modal>
	)
}

export default ProvenanceModal