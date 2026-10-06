<script lang="ts">
	import { Popover as ArkPopover } from '@ark-ui/svelte/popover'
	import { classNames } from 'syw-common/helpers'
    import type { PopoverProps } from 'syw-common/types';

	let {
		open = false,
		title,
		description,
		positioning,
		onOpenChange,
		className,
		children
	}: PopoverProps = $props()

	const handleOpenChange = (event: { open: boolean }) => {
		onOpenChange(event.open)
	}
</script>

<ArkPopover.Root
	open={open}
	modal={true}
	lazyMount={true}
	unmountOnExit={true}
	closeOnInteractOutside={true}
	positioning={positioning}
	onOpenChange={handleOpenChange}
>
	<!-- <Portal> -->
		<ArkPopover.Positioner
			class={classNames('PopoverPositioner')}
		>
			<ArkPopover.Content
				class={classNames(
					className,
					'PopoverContent'
				)}
			>
				<ArkPopover.Arrow
					class={classNames('PopoverArrow')}
				>
					<ArkPopover.ArrowTip />
				</ArkPopover.Arrow>
				<div
					class={classNames(
						'PopoverContentBox',
						'PopoverScrollable'
					)}
				>
					{#if title}
						<hgroup
							class={classNames('PopoverContentHeader')}
						>
							{#if title}
								<ArkPopover.Title
									class='syw-hidden'
								>
									{title}
								</ArkPopover.Title>
							{/if}
							{#if description}
								<ArkPopover.Description
									class='syw-hidden'
								>
									{description}
								</ArkPopover.Description>
							{/if}
						</hgroup>
					{/if}
					{@render children?.()}
				</div>
			</ArkPopover.Content>
		</ArkPopover.Positioner>
	<!-- </Portal> -->
</ArkPopover.Root>