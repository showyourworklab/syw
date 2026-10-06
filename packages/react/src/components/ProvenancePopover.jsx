import { classNames } from 'syw-common/helpers'
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

	const handleOpenChange = (newOpen, event) => {
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
			title={getText("provenance", "toggle")}
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