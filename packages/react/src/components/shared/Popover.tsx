import { useMemo } from 'react'
import { Popover as ArkPopover } from '@ark-ui/react/popover'
import { classNames, createOpenChangeEvents } from 'syw-common/helpers/ui'
import type { PopoverProps } from 'syw-common/types/components'

const Popover = ({
	open = false,
	title,
	description,
	positioning,
	onOpenChange,
	children,
	className
} : PopoverProps) => {

	// Ark's onOpenChange has no DOM event, so remember the one that caused the change
	const openChangeEvents = useMemo(createOpenChangeEvents, [])
	const handleOpenChange = (event: { open: boolean }) => {
		onOpenChange(event.open, openChangeEvents.take())
	}

	return (
		<ArkPopover.Root
			open={open}
			modal={true}
			lazyMount={true}
			unmountOnExit={true}
			closeOnInteractOutside={true}
			positioning={positioning}
			onOpenChange={handleOpenChange}
			onEscapeKeyDown={openChangeEvents.record}
			onInteractOutside={openChangeEvents.record}
		>
			{/* <Portal> */}
				<ArkPopover.Positioner
					className={classNames('PopoverPositioner')}
				>
					<ArkPopover.Content
						onClickCapture={openChangeEvents.record}
						onPointerDownCapture={openChangeEvents.record}
						className={classNames(
							className,
							'PopoverContent'
						)}
					>
						<ArkPopover.Arrow
							className={classNames('PopoverArrow')}
						>
							<ArkPopover.ArrowTip />
						</ArkPopover.Arrow>
						<div
							className={classNames(
								'PopoverContentBox',
								'PopoverScrollable'
							)}
						>
							{title ?
								<hgroup
									className={classNames('PopoverContentHeader')}
								>
									{title ?
										<ArkPopover.Title
											className='syw-hidden'
										>
											{title}
										</ArkPopover.Title>
									: null}
									{description ?
										<ArkPopover.Description
											className='syw-hidden'
										>
											{description}
										</ArkPopover.Description>
									: null}
								</hgroup>
							: null}
							{children}
						</div>
					</ArkPopover.Content>
				</ArkPopover.Positioner>
			{/* </Portal> */}
		</ArkPopover.Root>
	)
}

export default Popover