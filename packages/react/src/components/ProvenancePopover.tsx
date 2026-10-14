import { classNames } from 'syw-common/helpers/ui'
import { useI18nContext, useUiContext, useDataContext } from '$src/context'
import Popover from './Popover'
import Provenance from './Provenance'

const ProvenancePopover = () => {
	const {
		isProvenanceOpen,
		openProvenance,
		closeProvenance,
		closeExplainer,
		elem
	} = useUiContext()
	const { getText } = useI18nContext()
	const { mediaType } = useDataContext()

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
			title={getText("provenance", "toggle", mediaType)}
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