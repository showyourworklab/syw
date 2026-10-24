import type { ComponentProps, ReactNode } from 'react'
import { Portal as ArkPortal } from '@ark-ui/react/portal'
import { Tooltip as ArkTooltip } from '@ark-ui/react/tooltip'
import { classNames } from 'syw-common/helpers/ui'

export interface TooltipProps {
	content?: ReactNode
	disabled?: boolean
	ContentProps?: ComponentProps<typeof ArkTooltip.Content>
	children: ReactNode
	className?: string
}

const Tooltip = ({
	content,
	disabled,
	ContentProps = {},
	children,
	className
}: TooltipProps) => {
	if (disabled || content === undefined) return children;
	return (
		<ArkTooltip.Root
			openDelay={0}
			lazyMount={true}
			unmountOnExit={true}
		>
			<ArkTooltip.Trigger
				className={classNames(
					'TooltipTrigger',
					className,
				)}
			>
				{children}
			</ArkTooltip.Trigger>
			<ArkPortal>
				<ArkTooltip.Positioner
					className={classNames('TooltipPositioner')}
				>
					<ArkTooltip.Content
						{...ContentProps}
						className={classNames(
							'TooltipContent',
							ContentProps?.className,
						)}
					>
						<ArkTooltip.Arrow
							className={classNames('TooltipArrow')}
						>
							<ArkTooltip.ArrowTip
								className={classNames('TooltipArrowTip')}
							/>
						</ArkTooltip.Arrow>
						{content}
					</ArkTooltip.Content>
				</ArkTooltip.Positioner>
			</ArkPortal>
		</ArkTooltip.Root>
	)
}

export default Tooltip