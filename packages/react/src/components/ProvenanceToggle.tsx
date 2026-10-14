import type { MouseEvent } from 'react'
import { classNames } from 'syw-common/helpers/ui'
import { useDataContext, useI18nContext, useUiContext } from '$src/context'
import Icon from './Icon'

const ProvenanceToggle = () => {
	const { getText } = useI18nContext()
	const { mediaType } = useDataContext()
	const { isProvenanceOpen, openProvenance, closeProvenance } = useUiContext()

	const onClick = (event: MouseEvent<HTMLButtonElement>) => isProvenanceOpen
		? closeProvenance(event)
		: openProvenance(event)

	return (
		<button
			aria-pressed={isProvenanceOpen}
			className={classNames('ProvenanceToggle')}
			onClick={onClick}
		>
			<Icon
				type="signal"
			/>
			<span>
				{getText('provenance', 'toggle', mediaType)}
			</span>
		</button>
	)
}

export default ProvenanceToggle