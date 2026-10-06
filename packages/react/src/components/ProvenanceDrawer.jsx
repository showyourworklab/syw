import { classNames } from 'syw-common/helpers'
import { useI18nContext, useUiContext, useDataContext } from '$src/context'
import Drawer from './Drawer'
import Provenance from './Provenance'

const ProvenanceDrawer = ({
	direction
}) => {
	const {
		isExplainerOpen,
		isProvenanceOpen,
		openProvenance,
		closeProvenance,
		closeExplainer
	} = useUiContext()
	const { getText } = useI18nContext()

	const handleOpenChange = (newOpen, event) => {
		const originalEvent = event
		if(newOpen) {
			openProvenance(originalEvent)
		} else {
			closeProvenance(originalEvent)
			closeExplainer(originalEvent)
		}
	}

	return (
		<Drawer
			open={isProvenanceOpen}
			title={getText("provenance", "toggle")}
			description=""
			direction={direction}
			onOpenChange={handleOpenChange}
			className={classNames('ProvenanceDrawer')}
		>
			<Provenance />
		</Drawer>
	)
}

export default ProvenanceDrawer