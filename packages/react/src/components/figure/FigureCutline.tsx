import { classNames } from 'syw-common/helpers/ui'
import ProvenanceToggle from '$src/components/provenance/ProvenanceToggle'

const FigureCutline = () => {
	return (
		<div
			className={classNames('FigureCutline')}
		>
			<ProvenanceToggle />
		</div>
	)
}

export default FigureCutline