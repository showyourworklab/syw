import { Dialog } from '@ark-ui/react/dialog'
import { classNames } from 'syw-common/helpers'
import type { ModalProps } from 'syw-common/types/components'
import Icon from './Icon'

const Modal = ({
	open = false,
	title,
	description,
	onOpenChange,
	children,
	className
}: ModalProps) => {

	const handleOpenChange = (event: { open: boolean }) => {
		onOpenChange(event.open)
	}

	return (
		<Dialog.Root
			open={open}
			modal={false}
			lazyMount={true}
			closeOnInteractOutside={true}
			onOpenChange={handleOpenChange}
		>
			{/* <Portal> */}
				<Dialog.Backdrop
					className={classNames('ModalBackdrop')}
				/>
				<Dialog.Positioner
					className={classNames('ModalPositioner')}
				>
					<Dialog.Content
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