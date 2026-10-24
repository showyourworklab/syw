import { classNames } from 'syw-common/helpers/ui'
import { useDataContext, useI18nContext, useUiContext } from '$src/context'
import Modal from '../shared/Modal'
import Provenance from './Provenance'

const ProvenanceModal = () => {
	const {
		isProvenanceOpen,
		openProvenance,
		closeProvenance,
		closeExplainer
	} = useUiContext()
	const { getText } = useI18nContext()
	const { mediaType } = useDataContext()

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
			title={getText("provenance", "toggle", mediaType) ?? undefined}
			onOpenChange={handleOpenChange}
			className={classNames('ProvenanceModal')}
		>
			<Provenance />
		</Modal>
	)
}

export default ProvenanceModal