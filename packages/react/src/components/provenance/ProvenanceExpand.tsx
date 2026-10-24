import { useUiContext } from '$src/context'
import Provenance from '$src/components/provenance/Provenance'
import Collapse from '$src/components/shared/Collapse'

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