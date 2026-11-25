<script lang="ts">
	import type { ComponentProps, Snippet } from 'svelte'
	import { Portal as ArkPortal } from '@ark-ui/svelte/portal'
	import { Tooltip as ArkTooltip } from '@ark-ui/svelte/tooltip'
	import { classNames } from 'syw-common/helpers/ui'
	import { getUiContext } from '$lib/store/ui.js'

	export interface TooltipProps {
		content?: string
		disabled?: boolean
		// Hide the dotted underline, e.g. when the trigger is an icon
		noUnderline?: boolean
		ContentProps?: ComponentProps<typeof ArkTooltip.Content>
		className?: string
		children?: Snippet
	}

	const {
		content,
		disabled,
		noUnderline,
		ContentProps = {},
		className,
		children
	}: TooltipProps = $props()

	// Portal into the component's root rather than <body>: outside the panels' scroll boxes so it isn't clipped,
	// but inside the component so CSS variables set on a wrapper still apply
	// No context when Tooltip is used on its own (it's exported), so it falls back to <body>
	const elem = getUiContext()?.elem

</script>

{#if disabled || !content}
	{@render children?.()}
{:else}
	<ArkTooltip.Root
		openDelay={0}
		lazyMount={true}
		unmountOnExit={true}
	>
		<ArkTooltip.Trigger
			class={classNames(
				'TooltipTrigger',
				noUnderline ? 'TooltipTrigger_noUnderline' : null,
				className,
			)}
		>
			{@render children?.()}
		</ArkTooltip.Trigger>
		<ArkPortal container={$elem ?? undefined}>
			<ArkTooltip.Positioner
				class={classNames('TooltipPositioner')}
			>
				<ArkTooltip.Content
					{...ContentProps}
					class={classNames(
						'TooltipContent',
						ContentProps?.className,
					)}
				>
					<ArkTooltip.Arrow
						class={classNames('TooltipArrow')}
					>
						<ArkTooltip.ArrowTip
							class={classNames('TooltipArrowTip')}
						/>
					</ArkTooltip.Arrow>
					{content}
				</ArkTooltip.Content>
			</ArkTooltip.Positioner>
		</ArkPortal>
	</ArkTooltip.Root>
{/if}
