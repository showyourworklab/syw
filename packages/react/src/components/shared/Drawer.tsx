import { useMemo } from 'react'
import { Drawer as ArkDrawer } from '@ark-ui/react/drawer'
import type { DrawerRootProps } from '@ark-ui/react/drawer'
import { classNames } from 'syw-common/helpers/ui'
import type { DrawerProps } from 'syw-common/types/components'
import Icon from '$src/components/shared/Icon'

const Drawer = ({
	open = false,
	title,
	description,
	direction = 'bottom',
	onOpenChange,
	children,
	className
}: DrawerProps) => {
	const handleOpenChange = (event: { open: boolean }) => {
		onOpenChange(event.open)
	}

	// Ark only types logical directions, but physical left and right are passed through as is
	const swipeDirection = useMemo(() => {
		let safeSwipeDirection: string = direction
		if(direction === 'bottom') safeSwipeDirection = 'down'
		return safeSwipeDirection as DrawerRootProps['swipeDirection']
	}, [direction])

	return (
		<ArkDrawer.Root
			open={open}
			swipeDirection={swipeDirection}
			modal={false}
			lazyMount={true}
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