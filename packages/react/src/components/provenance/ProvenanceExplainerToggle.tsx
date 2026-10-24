import { classNames } from 'syw-common/helpers/ui'
import type { ProvenanceExplainerToggleProps } from 'syw-common/types/components'
import { useUiContext, useI18nContext } from '$src/context'
import Icon from '$src/components/shared/Icon'

const ProvenanceExplainerToggle = ({
	className
}: ProvenanceExplainerToggleProps) => {
	const {
		variant,
		isExplainerOpen,
		openExplainer,
		closeExplainer,
		openProvenance
	} = useUiContext()
	const { getText } = useI18nContext()

	const onClick = (event?: unknown) => {
		// Toggle explainer based on current state
		if(isExplainerOpen) {
			closeExplainer(event)
		} else {
			openExplainer(event)
		}
		// If modal, also open provenance modal to view explainer
		if(variant === "modal") {
			openProvenance(event)
		}
	}

	return (
		<button
			className={classNames(
				'ProvenanceExplainerToggle',
				className
			)}
			aria-pressed={isExplainerOpen}
			onClick={onClick}
		>
			<span>
				{getText('explainer', 'toggle')}
			</span>
			<Icon
				type={isExplainerOpen ? "up" : "down"}
			/>
		</button>
	)
}

export default ProvenanceExplainerToggle