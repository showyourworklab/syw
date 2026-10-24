import { classNames } from 'syw-common/helpers/ui'
import type { ProvenanceDrawerProps } from 'syw-common/types/components'
import { useUiContext } from '$src/context'
import Drawer from '$src/components/shared/Drawer'
import Provenance from '$src/components/provenance/Provenance'
import { useMediaText } from '$src/hooks'

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
	const getMediaText = useMediaText()

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
			title={getMediaText("provenance", "toggle")}
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