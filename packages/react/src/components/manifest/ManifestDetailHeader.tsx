import { classNames } from 'syw-common/helpers/ui'
import type { ManifestDetailHeaderProps } from 'syw-common/types/components'
import Icon from '$src/components/shared/Icon'

function ManifestDetailHeader({
	open,
	title,
	titleIcon,
	value,
	onToggle,
	className,
}: ManifestDetailHeaderProps) {
	const Element = onToggle ? 'button' : 'div'

	return (
		<Element
			{...(onToggle ? { type: 'button', 'aria-expanded': open, onClick: onToggle } : {})}
			className={classNames(
				'ManifestDetailHeader',
				onToggle ? 'ManifestDetailToggle' : null,
				className,
			)}
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
				<span
					className={classNames('ManifestDetailValueText')}
				>
					{value}
				</span>
			</span>
			{onToggle ?
				<span
					className={classNames('ManifestDetailToggleIcon')}
				>
					<Icon
						type={open ? 'up' : 'down'}
					/>
				</span>
			: null}
		</Element>
	)
}

export default ManifestDetailHeader
