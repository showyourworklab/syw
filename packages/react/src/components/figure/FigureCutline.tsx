import { classNames } from 'syw-common/helpers/ui'
import ProvenanceToggle from '../provenance/ProvenanceToggle'

const FigureCutline = () => {
	return (
		<div
			className={classNames('FigureCutline')}
		>
			<div
				className={classNames('FigureCutlineToggles')}
			>
				<ProvenanceToggle />
			</div>
		</div>
	)
}

export default FigureCutline