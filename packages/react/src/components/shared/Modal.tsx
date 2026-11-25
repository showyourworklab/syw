import { Dialog } from '@ark-ui/react/dialog'
import { useMemo } from 'react'
import { classNames, createOpenChangeEvents } from 'syw-common/helpers/ui'
import type { ModalProps } from 'syw-common/types/components'
import Icon from '$src/components/shared/Icon'

const Modal = ({
	open = false,
	title,
	description,
	onOpenChange,
	children,
	className
}: ModalProps) => {

	// Ark's onOpenChange has no DOM event, so remember the one that caused the change
	const openChangeEvents = useMemo(createOpenChangeEvents, [])
	const handleOpenChange = (event: { open: boolean }) => {
		onOpenChange(event.open, openChangeEvents.take())
	}

	return (
		<Dialog.Root
			open={open}
			modal={false}
			lazyMount={true}
			closeOnInteractOutside={true}
			onOpenChange={handleOpenChange}
			onEscapeKeyDown={openChangeEvents.record}
			onInteractOutside={openChangeEvents.record}
		>
			{/* <Portal> */}
				<Dialog.Backdrop
					className={classNames('ModalBackdrop')}
				/>
				<Dialog.Positioner
					className={classNames('ModalPositioner')}
				>
					<Dialog.Content
						onClickCapture={openChangeEvents.record}
						onPointerDownCapture={openChangeEvents.record}
						className={classNames(
							className,
							'ModalContent'
						)}
					>
						<div
							className={classNames('ModalContentBox')}
						>
							{title ?
								<hgroup
									className={classNames('ModalContentHeader')}
								>
									{title ?
										<Dialog.Title>
											{title}
										</Dialog.Title>
									: null}
									{description ?
										<Dialog.Description
											className='syw-hidden'
										>
											{description}
										</Dialog.Description>
									: null}
								</hgroup>
							: null}
							{children}
						</div>
						<Dialog.CloseTrigger
							className={classNames('ModalClose')}
						>
							<Icon
								type="close"
							/>
						</Dialog.CloseTrigger>
					</Dialog.Content>
				</Dialog.Positioner>
			{/* </Portal> */}
		</Dialog.Root>
	)
}

export default Modal