<script>
	import { Drawer as ArkDrawer } from '@ark-ui/svelte/drawer'
	import { classNames } from 'syw-common/helpers'
	import Icon from './Icon.svelte'

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

	const handleOpenChange = (event) => {
		onOpenChange(event.open)
	}
</script>

<ArkDrawer.Root
	open={open}
	swipeDirection={swipeDirection}
	modal={false}
	lazyMount={true}
	unmountOnExit={true}
	closeOnInteractOutside={true}
	onOpenChange={handleOpenChange}
>
	<ArkDrawer.Backdrop
		class={classNames('DrawerBackdrop')}
	/>
	<ArkDrawer.Positioner
		class={classNames('DrawerPositioner')}
	>
		<ArkDrawer.Content
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