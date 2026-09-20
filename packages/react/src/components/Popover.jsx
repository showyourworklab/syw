import { useMemo } from 'react'
import { Popover as ArkPopover } from '@ark-ui/react/popover'
import { classNames } from 'syw-common/helpers'
import Icon from './Icon'

const Popover = ({
	open = false,
	title,
	description,
	direction = 'bottom',
	positioning,
	onOpenChange,
	children,
	className
}) => {


	const handleOpenChange = (event) => {
		onOpenChange(event.open)
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
		>
			{/* <Portal> */}
				<ArkPopover.Positioner
					className={classNames('PopoverPositioner')}
				>
					<ArkPopover.Content
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