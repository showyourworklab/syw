<script lang="ts">
	import { Drawer as ArkDrawer } from '@ark-ui/svelte/drawer'
	import { classNames, createOpenChangeEvents } from 'syw-common/helpers/ui'
	import Icon from '$lib/components/shared/Icon.svelte'

	let {
		open = false,
		title,
		description,
		direction = 'bottom',
		onOpenChange,
		className,
		children
	} = $props()

	let swipeDirection = $derived.by(() => {
		let safeSwipeDirection = direction
		if(direction === 'bottom') safeSwipeDirection = 'down'
		return safeSwipeDirection
	})

	// Ark's onOpenChange has no DOM event, so remember the one that caused the change
	const openChangeEvents = createOpenChangeEvents()
	const handleOpenChange = (event: { open: boolean }) => {
		onOpenChange(event.open, openChangeEvents.take())
	}
</script>

<ArkDrawer.Root
	open={open}
	swipeDirection={swipeDirection}
	modal={false}
	lazyMount={true}
	closeOnInteractOutside={true}
	onOpenChange={handleOpenChange}
	onEscapeKeyDown={openChangeEvents.record}
	onInteractOutside={openChangeEvents.record}
>
	<ArkDrawer.Backdrop
		class={classNames('DrawerBackdrop')}
	/>
	<ArkDrawer.Positioner
		class={classNames('DrawerPositioner')}
	>
		<ArkDrawer.Content
			onclickcapture={openChangeEvents.record}
			onpointerdowncapture={openChangeEvents.record}
			class={classNames(
				className,
				'DrawerContent'
			)}
		>
			<ArkDrawer.Grabber
				class={classNames('DrawerGrabber')}
			>
				<ArkDrawer.GrabberIndicator
					class={classNames('DrawerGrabberIndicator')}
				/>
			</ArkDrawer.Grabber>
			<div
				class={classNames(
					'DrawerContentBox',
					'DrawerScrollable'
				)}
			>
				{#if title}
					<hgroup
						class={classNames('DrawerContentHeader')}
					>
						{#if title}
							<ArkDrawer.Title>
								{title}
							</ArkDrawer.Title>
						{/if}
						{#if description}
							<ArkDrawer.Description
								class='syw-hidden'
							>
								{description}
							</ArkDrawer.Description>
						{/if}
					</hgroup>
				{/if}
				{@render children?.()}
			</div>
			<ArkDrawer.CloseTrigger
				class={classNames('DrawerClose')}
			>
				<Icon
					type="close"
				/>
			</ArkDrawer.CloseTrigger>
		</ArkDrawer.Content>
	</ArkDrawer.Positioner>
</ArkDrawer.Root>