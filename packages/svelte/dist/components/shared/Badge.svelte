<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import type { BadgeProps } from 'syw-common/types/components'
    import Tooltip from './Tooltip.svelte'
	import type { TooltipProps } from './Tooltip.svelte'
    import Icon from './Icon.svelte'

	interface Props extends BadgeProps {
		TooltipProps?: Omit<TooltipProps, 'children'>
	}

	const {
		type,
		TooltipProps: tooltipProps = {},
		children,
		className
	}: Props = $props()
</script>

<Tooltip
	{...tooltipProps}
	// content={typeDefinition()}
	ContentProps={{
		...tooltipProps?.ContentProps,
		className: classNames(
			tooltipProps?.ContentProps?.className,
			'BadgeTooltipContent',
			type?.key ? `BadgeTooltipContent_${type?.key}` : null,
		),
	}}
	className={classNames(
		'BadgeTooltipTrigger',
		tooltipProps?.className,
	)}
>
	<span
		class={classNames(
			'Badge',
			className,
			type?.key ? `Badge_${type?.key}` : null,
		)}
	>
		<Icon
			type={type?.key}
			className={classNames('BadgeIcon')}
		/>
		<span
			class='syw-hidden'
		>
			{@render children?.()}
		</span>
	</span>
</Tooltip>
