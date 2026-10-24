import { classNames } from 'syw-common/helpers/ui'
import type { ProvenanceDrawerProps } from 'syw-common/types/components'
import { useI18nContext, useUiContext, useDataContext } from '$src/context'
import Drawer from '../shared/Drawer'
import Provenance from './Provenance'

const ProvenanceDrawer = ({
	direction
}: ProvenanceDrawerProps) => {
	const {
		isExplainerOpen,
		isProvenanceOpen,
		openProvenance,
		closeProvenance,
		closeExplainer
	} = useUiContext()
	const { getText } = useI18nContext()
	const { mediaType } = useDataContext()

	const handleOpenChange = (newOpen: boolean, event?: unknown) => {
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
			title={getText("provenance", "toggle", mediaType)}
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