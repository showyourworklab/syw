import { useMemo } from 'react'
import type { ComponentProps, ReactNode } from 'react'
import { Portal as ArkPortal } from '@ark-ui/react/portal'
import { Tooltip as ArkTooltip } from '@ark-ui/react/tooltip'
import { classNames } from 'syw-common/helpers/ui'
import { useUiContext } from '$src/context/ui'

export interface TooltipProps {
	content?: ReactNode
	disabled?: boolean
	// Hide the dotted underline, e.g. when the trigger is an icon
	noUnderline?: boolean
	ContentProps?: ComponentProps<typeof ArkTooltip.Content>
	children: ReactNode
	className?: string
}

const Tooltip = ({
	content,
	disabled,
	noUnderline,
	ContentProps = {},
	children,
	className
}: TooltipProps) => {
	// Portal into the component's root rather than <body>: outside the panels' scroll boxes so it isn't clipped,
	// but inside the component so CSS variables set on a wrapper still apply
	const { elem } = useUiContext()
	const portalContainer = useMemo(() => ({ current: elem }), [elem])
	if (disabled || content === undefined || content === null || content === '') return children;
	return (
		<ArkTooltip.Root
			openDelay={0}
			lazyMount={true}
			unmountOnExit={true}
		>
			<ArkTooltip.Trigger
				className={classNames(
					'TooltipTrigger',
					noUnderline ? 'TooltipTrigger_noUnderline' : null,
					className,
				)}
			>
				{children}
			</ArkTooltip.Trigger>
			<ArkPortal container={portalContainer}>
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