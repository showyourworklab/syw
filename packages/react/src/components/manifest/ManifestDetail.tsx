import { useState } from 'react'
import { classNames } from 'syw-common/helpers/ui'
import type { ManifestDetailProps } from 'syw-common/types/components'
import Collapse from '$src/components/shared/Collapse'
import Icon from '$src/components/shared/Icon'

function ManifestDetail({
	open,
	title,
	definition,
	titleIcon,
	value,
	prompt,
	onToggle,
	className,
	children
}: ManifestDetailProps) {
	const [innerOpen, setInnerOpen] = useState(false)
	// Titled details open to show their definition and children
	const isToggleable = !!title
	// Callers can control whether it's open, otherwise it keeps its own state
	const isOpen = open ?? innerOpen

	const handleToggle = () => {
		if(open === undefined) setInnerOpen(!innerOpen)
		onToggle?.()
	}

	return (
		<div
			className={classNames(
				'ManifestDetail',
				isToggleable ? 'ManifestDetail_toggleable' : null,
				isToggleable && isOpen ? 'ManifestDetail_open' : null,
				className,
			)}
		>
			{isToggleable ?
				<>
					<button
						type="button"
						aria-expanded={isOpen}
						className={classNames('ManifestDetailToggle')}
						onClick={handleToggle}
					>
						<span
							className={classNames('ManifestDetailTitle')}
						>
							{titleIcon ?
								<Icon
									type={titleIcon}
									className={classNames('ManifestDetailTitleIcon')}
								/>
							: null}
							<span
								className={classNames('ManifestDetailTitleText')}
							>
								{title}
							</span>
						</span>
						<span
							className={classNames('ManifestDetailValue')}
						>
							{value}
						</span>
						{/* {prompt ?
							<span
								className={classNames('ManifestDetailPrompt')}
							>
								{prompt}
							</span>
						: null} */}
						<span
							className={classNames('ManifestDetailToggleIcon')}
						>
							<Icon
								type={isOpen ? 'up' : 'down'}
							/>
						</span>
					</button>
					<Collapse
						open={isOpen}
					>
						<div
							className={classNames('ManifestDetailBody')}
						>
							{children}
							{definition ?
								<p
									className={classNames('ManifestDetailDefinition')}
								>
									<Icon
										type="info"
										className={classNames('ManifestDetailDefinitionIcon')}
									/>
									<span>
										{definition}
									</span>
								</p>
							: null}
						</div>
					</Collapse>
				</>
			: children ?
				<div
					className={classNames('ManifestDetailBody')}
				>
					{children}
				</div>
			: null}
		</div>
	)
}

export default ManifestDetail
