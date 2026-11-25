<script lang="ts">
	import { Dialog } from '@ark-ui/svelte/dialog'
	import { classNames, createOpenChangeEvents } from 'syw-common/helpers/ui'
	import type { ModalProps } from 'syw-common/types/components'
	import Icon from '$lib/components/shared/Icon.svelte'

	let {
		open = false,
		title,
		description,
		onOpenChange,
		className,
		children
	}: ModalProps = $props()

	// Ark's onOpenChange has no DOM event, so remember the one that caused the change
	const openChangeEvents = createOpenChangeEvents()
	const handleOpenChange = (event: { open: boolean }) => {
		onOpenChange(event.open, openChangeEvents.take())
	}
</script>

<Dialog.Root
	open={open}
	modal={false}
	lazyMount={true}
	closeOnInteractOutside={true}
	onOpenChange={handleOpenChange}
	onEscapeKeyDown={openChangeEvents.record}
	onInteractOutside={openChangeEvents.record}
>
	<Dialog.Backdrop
		class={classNames('ModalBackdrop')}
	/>
	<Dialog.Positioner
		class={classNames('ModalPositioner')}
	>
		<Dialog.Content
			onclickcapture={openChangeEvents.record}
			onpointerdowncapture={openChangeEvents.record}
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
