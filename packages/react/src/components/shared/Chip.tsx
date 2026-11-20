import { classNames } from 'syw-common/helpers/ui'
import type { ChipProps } from 'syw-common/types/components'
import Icon from '$src/components/shared/Icon'

const Chip = ({
	href,
	overline,
	icon,
	className,
	children
}: ChipProps) => {
	const Element = href ? 'a' : 'span'

	return (
		<Element
			{...(href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {})}
			className={classNames(
				'Chip',
				href ? 'Chip_link' : null,
				className,
			)}
		>
			{overline ?
				<span
					className={classNames('ChipOverline')}
				>
					{overline}
				</span>
			: null}
			<span
				className={classNames('ChipLabel')}
			>
				{icon ?
					<Icon
						type={icon}
						className={classNames('ChipIcon')}
					/>
				: null}
				{children}
			</span>
		</Element>
	)
}

export default Chip
