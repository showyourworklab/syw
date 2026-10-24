import { classNames } from 'syw-common/helpers/ui'
import { useI18nContext } from '$src/context/i18n'
import { useUiContext } from '$src/context/ui'
import Collapse from '$src/components/shared/Collapse'
import Icon from '$src/components/shared/Icon'
import Markdown from '$src/components/shared/Markdown'
import { useDataContext } from '$src/context'

const ProvenanceExplainer = () => {
	const { getText } = useI18nContext()
	const { mediaType } = useDataContext()
	const { isExplainerOpen, closeExplainer } = useUiContext()

	const onCloseClick = closeExplainer

	return (
		<div
			className={classNames('ProvenanceExplainer')}
		>
			<Collapse
				open={isExplainerOpen}
			>
				<div
					className={classNames('ProvenanceExplainerInner')}
				>
					<div
						className={classNames('ProvenanceExplainerBox')}
					>
						<div
							className={classNames('ProvenanceExplainerHeader')}
						>
							<button
								className={classNames('ProvenanceExplainerClose')}
								aria-pressed={isExplainerOpen}
								aria-label={getText('explainer', 'toggle', 'close') ?? undefined}
								onClick={onCloseClick}
							>
								<Icon
									type="close"
								/>
							</button>
							<p
								className={classNames('ProvenanceExplainerLede')}
							>
								{getText('explainer', 'lede', mediaType)}
							</p>
						</div>
						<dl
							className={classNames('ProvenanceExplainerSections')}
						>
							{[1,2].map(index =>
								<div
									key={index}
									className={classNames('ProvenanceExplainerSection')}
								>
									<dt
										className={classNames('ProvenanceExplainerSectionTitle')}
									>
										{getText('explainer', 'section', index, 'title')}
									</dt>
									<Markdown
										tag="dd"
										className={classNames('ProvenanceExplainerSectionBody')}
										content={getText('explainer', 'section', index, 'body', mediaType)}
									/>
								</div>
							)}
						</dl>
					</div>
				</div>
			</Collapse>
		</div>
	)
}

export default ProvenanceExplainer