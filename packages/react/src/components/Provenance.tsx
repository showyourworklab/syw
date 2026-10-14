import { useEffect, useRef } from 'react'
import { classNames } from 'syw-common/helpers/ui'
import { useI18nContext } from '$src/context/i18n'
import { useDataContext } from '$src/context/data'
import { useUiContext } from '$src/context/ui'
import Manifest from './Manifest'
import Explainer from './Explainer'
import ExplainerToggle from './ExplainerToggle'
import ProvenanceVerify from './ProvenanceVerify'

function Provenance() {
	const ref = useRef<HTMLDivElement>(null)
	const firstPreviewRef = useRef<HTMLDivElement>(null)
	const { getText } = useI18nContext()
	const { manifests } = useDataContext()
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
				<div
					className={classNames('ProvenanceNone')}
				>
					{getText("provenance", "missing")}
				</div>
			: null}
			<div
				className={classNames('ProvenanceFooter')}
			>
				<ExplainerToggle />
				<ProvenanceVerify />
			</div>
			<Explainer />
		</div>
	)
}

export default Provenance