import { useUiContext } from '$src/context'
import Provenance from './Provenance'
import Collapse from '../shared/Collapse'

const ProvenanceExpand = () => {
	const {
		isProvenanceOpen
	} = useUiContext()

	return (
		<Collapse
			open={isProvenanceOpen}
		>
			<Provenance />
		</Collapse>
	)
}

export default ProvenanceExpand