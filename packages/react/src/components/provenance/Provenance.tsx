import { useEffect, useRef } from 'react'
import { classNames } from 'syw-common/helpers/ui'
import { isDataLoading } from 'syw-common/helpers/data'
import { useDataContext } from '$src/context/data'
import { useUiContext } from '$src/context/ui'
import Manifest from '$src/components/manifest/Manifest'
import ProvenanceExplainer from '$src/components/provenance/ProvenanceExplainer'
import ProvenanceExplainerToggle from '$src/components/provenance/ProvenanceExplainerToggle'
import ProvenanceVerify from '$src/components/provenance/ProvenanceVerify'
import ProvenanceLoading from '$src/components/provenance/ProvenanceLoading'
import ProvenanceEmpty from '$src/components/provenance/ProvenanceEmpty'

function Provenance() {
	const ref = useRef<HTMLDivElement>(null)
	const firstPreviewRef = useRef<HTMLDivElement>(null)
	const { phase, src, manifests } = useDataContext()
	const { isProvenanceOpen } = useUiContext()

	useEffect(() => {
		if(isProvenanceOpen && firstPreviewRef.current) {
			firstPreviewRef.current?.focus()
		}
	}, [firstPreviewRef, isProvenanceOpen])

	return (
		<div
			ref={ref}
			className={classNames('Provenance')}
		>
			{manifests && manifests.length ?
				<div
					className={classNames('ProvenanceList')}
				>
					{manifests.map((manifest, index) =>
						<Manifest
							key={index}
							manifest={manifest}
							previewRef={index === 0 ? firstPreviewRef : null}
						/>
					)}
				</div>
			: null}
			{!manifests || !manifests.length ?
				isDataLoading({ phase, src })
					? <ProvenanceLoading />
					: <ProvenanceEmpty />
			: null}
			<div
				className={classNames('ProvenanceFooter')}
			>
				<ProvenanceExplainerToggle />
				<ProvenanceVerify />
			</div>
			<ProvenanceExplainer />
		</div>
	)
}

export default Provenance