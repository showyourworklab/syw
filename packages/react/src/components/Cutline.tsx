import { classNames } from 'syw-common/helpers/ui'
import ProvenanceToggle from './ProvenanceToggle'

const Cutline = () => {
	return (
		<div
			className={classNames('Cutline')}
		>
			<div
				className={classNames('CutlineToggles')}
			>
				<ProvenanceToggle />
			</div>
		</div>
	)
}

export default Cutline