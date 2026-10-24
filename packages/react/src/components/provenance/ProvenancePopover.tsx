import { classNames } from 'syw-common/helpers/ui'
import { useUiContext } from '$src/context'
import Popover from '$src/components/shared/Popover'
import Provenance from '$src/components/provenance/Provenance'
import { useMediaText } from '$src/hooks'

const ProvenancePopover = () => {
	const {
		isProvenanceOpen,
		openProvenance,
		closeProvenance,
		closeExplainer,
		elem
	} = useUiContext()
	const getMediaText = useMediaText()

	const handleOpenChange = (newOpen: boolean, event?: unknown) => {
		if(newOpen) {
			openProvenance(event)
		} else {
			closeProvenance(event)
			closeExplainer(event)
		}
	}

	return (
		<Popover
			open={isProvenanceOpen}
			title={getMediaText("provenance", "toggle")}
			onOpenChange={handleOpenChange}
			positioning={{
				placement: 'right-start',
				offset: {
					// mainAxis: 12,
					// crossAxis: -12
				},
				getAnchorRect: () =>
					elem?.querySelector('.Syw-ProvenanceToggle')?.getBoundingClientRect() ?? null
			}}
			className={classNames('ProvenancePopover')}
		>
			<Provenance />
		</Popover>
	)
}

export default ProvenancePopover