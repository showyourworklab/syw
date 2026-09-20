import { useMemo } from 'react'
import { Drawer as ArkDrawer } from '@ark-ui/react/drawer'
import { classNames } from 'syw-common/helpers'
import Icon from './Icon'

const Drawer = ({
	open = false,
	title,
	description,
	direction = 'bottom',
	onOpenChange,
	children,
	className
}) => {
	const handleOpenChange = (event) => {
		onOpenChange(event.open)
	}

	const swipeDirection = useMemo(() => {
		let safeSwipeDirection = direction
		if(direction === 'bottom') safeSwipeDirection = 'down'
		return safeSwipeDirection
	}, [direction])

	return (
		<ArkDrawer.Root
			open={open}
			swipeDirection={swipeDirection}
			modal={false}
			lazyMount={true}
			unmountOnExit={true}
			closeOnInteractOutside={true}
			onOpenChange={handleOpenChange}
		>
			{/* <Portal> */}
				<ArkDrawer.Backdrop
					className={classNames('DrawerBackdrop')}
				/>
				<ArkDrawer.Positioner
					className={classNames('DrawerPositioner')}
				>
					<ArkDrawer.Content
						className={classNames(
							className,
							'DrawerContent'
						)}
					>
						<ArkDrawer.Grabber
							className={classNames('DrawerGrabber')}
						>
							<ArkDrawer.GrabberIndicator
								className={classNames('DrawerGrabberIndicator')}
							/>
						</ArkDrawer.Grabber>
						<div
							className={classNames(
								'DrawerContentBox',
								'DrawerScrollable'
							)}
						>
							{title ?
								<hgroup
									className={classNames('DrawerContentHeader')}
								>
									{title ?
										<ArkDrawer.Title>
											{title}
										</ArkDrawer.Title>
									: null}
									{description ?
										<ArkDrawer.Description
											className='syw-hidden'
										>
											{description}
										</ArkDrawer.Description>
									: null}
								</hgroup>
							: null}
							{children}
						</div>
						<ArkDrawer.CloseTrigger
							className={classNames('DrawerClose')}
						>
							<Icon
								type="close"
							/>
						</ArkDrawer.CloseTrigger>
					</ArkDrawer.Content>
				</ArkDrawer.Positioner>
			{/* </Portal> */}
		</ArkDrawer.Root>
	)
}

export default Drawer