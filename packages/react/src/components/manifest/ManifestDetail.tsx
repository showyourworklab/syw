import { useState } from 'react'
import { classNames } from 'syw-common/helpers/ui'
import type { ManifestDetailProps } from 'syw-common/types/components'
import { useI18nContext } from '$src/context'
import Collapse from '$src/components/shared/Collapse'
import ManifestDetailHeader from '$src/components/manifest/ManifestDetailHeader'
import ManifestDetailDefinition from '$src/components/manifest/ManifestDetailDefinition'

function ManifestDetail({
	open,
	title,
	titleIcon,
	value,
	trust,
	onToggle,
	className,
	children
}: ManifestDetailProps) {
	const { getText } = useI18nContext()
	const [innerOpen, setInnerOpen] = useState(false)
	// Titled details open when they have something to show
	const isToggleable = !!title && !!(children || trust)
	// Callers can control whether it's open, otherwise it keeps its own state
	const isOpen = open ?? innerOpen
	// The definition only states how far the value can be trusted
	const definition = trust ? getText('trust', trust.level, 'definition') : null

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
			{title ?
				<ManifestDetailHeader
					open={isOpen}
					title={title}
					titleIcon={titleIcon}
					value={value}
					onToggle={isToggleable ? handleToggle : undefined}
				/>
			: null}
			{isToggleable ?
				<Collapse
					open={isOpen}
				>
					<div
						className={classNames('ManifestDetailBody')}
					>
						{children}
						{definition ?
							<ManifestDetailDefinition>
								{definition}
							</ManifestDetailDefinition>
						: null}
					</div>
				</Collapse>
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
