import { classNames } from 'syw-common/helpers/ui'
import type { DetailProps } from 'syw-common/types/components'
import Tooltip from './Tooltip'
import Icon from './Icon'

function Detail({
	title,
	titleTooltip,
	titleIcon,
	footer,
	noBackground,
	className,
	children
}: DetailProps) {
	return (
		<div
			className={classNames(
				'Detail',
				noBackground ? 'Detail_noBackground' : null,
				className,
			)}
		>
			{title ?
				<div
					className={classNames('DetailTitle')}
				>
					{titleIcon ?
						<Icon
							type={titleIcon}
							className={classNames('DetailTitleIcon')}
						/>
					: null}
					<span>
						{title}
					</span>
					{titleTooltip ?
						<Tooltip
							content={titleTooltip}
						>
							<Icon
								type="info"
								className={classNames('DetailTitleTooltipIcon')}
							/>
						</Tooltip>
					: null}
				</div>
			: null}
			{children ?
				<div
					className={classNames('DetailBody')}
				>
					{children}
				</div>
			: null}
			{footer ?
				<p
					className={classNames('DetailFooter')}
				>
					{footer}
				</p>
			: null}
		</div>
	)
}

export default Detail
