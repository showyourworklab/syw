import { classNames, getManifestTypeIcon } from 'syw-common/helpers/ui'
import type { BadgeProps } from 'syw-common/types/components'
import Tooltip from './Tooltip'
import type { TooltipProps } from './Tooltip'
import Icon from './Icon'

interface ReactBadgeProps extends BadgeProps {
	TooltipProps?: Omit<TooltipProps, 'children'>
}

const Badge = ({
	type,
	TooltipProps: tooltipProps = {},
	children,
	className
}: ReactBadgeProps) => {
	return (
		<Tooltip
			{...tooltipProps}
			noUnderline
			ContentProps={{
				...tooltipProps?.ContentProps,
				className: classNames(
					tooltipProps?.ContentProps?.className,
					'BadgeTooltipContent',
					type?.key ? `BadgeTooltipContent_${type?.key}` : null,
				),
			}}
			className={classNames(
				'BadgeTooltipTrigger',
				tooltipProps?.className,
			)}
		>
			<span
				className={classNames(
					'Badge',
					className,
					type?.key ? `Badge_${type?.key}` : null,
				)}
			>
				<Icon
					type={getManifestTypeIcon(type?.key)}
					className={classNames('BadgeIcon')}
				/>
				<span
					className='syw-hidden'
				>
					{children}
				</span>
			</span>
		</Tooltip>
	)
}

export default Badge
