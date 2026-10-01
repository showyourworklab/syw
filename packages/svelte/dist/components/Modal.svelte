<script lang="ts">
	import { Dialog } from '@ark-ui/svelte/dialog'
	import { classNames } from 'syw-common/helpers'
	import type { ModalProps } from 'syw-common/types/components'
	import Icon from './Icon.svelte'

	let {
		open = false,
		title,
		description,
		onOpenChange,
		className,
		children
	}: ModalProps = $props()

	const handleOpenChange = (event: { open: boolean }) => {
		onOpenChange(event.open)
	}
</script>

<Dialog.Root
	open={open}
	modal={false}
	lazyMount={true}
	closeOnInteractOutside={true}
	onOpenChange={handleOpenChange}
>
	<Dialog.Backdrop
		class={classNames('ModalBackdrop')}
	/>
	<Dialog.Positioner
		class={classNames('ModalPositioner')}
	>
		<Dialog.Content
			class={classNames(
				className,
				'ModalContent'
			)}
		>
			<div
				class={classNames('ModalContentBox')}
			>
				{#if title}
					<hgroup
						class={classNames('ModalContentHeader')}
					>
						{#if title}
							<Dialog.Title>
								{title}
							</Dialog.Title>
						{/if}
						{#if description}
							<Dialog.Description
								class='syw-hidden'
							>
								{description}
							</Dialog.Description>
						{/if}
					</hgroup>
				{/if}
				{@render children?.()}
			</div>
			<Dialog.CloseTrigger
				class={classNames('ModalClose')}
			>
				<Icon
					type="close"
				/>
			</Dialog.CloseTrigger>
		</Dialog.Content>
	</Dialog.Positioner>
</Dialog.Root>
