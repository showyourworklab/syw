import type { MouseEvent } from 'react'
import { classNames } from 'syw-common/helpers/ui'
import { useUiContext } from '$src/context'
import Icon from '$src/components/shared/Icon'
import { useMediaText } from '$src/hooks'

const ProvenanceToggle = () => {
	const getMediaText = useMediaText()
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
				{getMediaText('provenance', 'toggle')}
			</span>
		</button>
	)
}

export default ProvenanceToggle