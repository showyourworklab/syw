import { classNames } from 'syw-common/helpers/ui'
import type { ManifestDetailProps } from 'syw-common/types/components'
import Tooltip from '../shared/Tooltip'
import Icon from '../shared/Icon'

function ManifestDetail({
	title,
	titleTooltip,
	titleIcon,
	footer,
	noBackground,
	className,
	children
}: ManifestDetailProps) {
	return (
		<div
			className={classNames(
				'ManifestDetail',
				noBackground ? 'ManifestDetail_noBackground' : null,
				className,
			)}
		>
			{title ?
				<div
					className={classNames('ManifestDetailTitle')}
				>
					{titleIcon ?
						<Icon
							type={titleIcon}
							className={classNames('ManifestDetailTitleIcon')}
						/>
					: null}
					<Tooltip
						content={titleTooltip}
					>
						<span
							className={classNames('ManifestDetailTitleText')}
						>
							{title}
						</span>
					</Tooltip>
				</div>
			: null}
			{children ?
				<div
					className={classNames('ManifestDetailBody')}
				>
					{children}
				</div>
			: null}
			{footer ?
				<p
					className={classNames('ManifestDetailFooter')}
				>
					{footer}
				</p>
			: null}
		</div>
	)
}

export default ManifestDetail
