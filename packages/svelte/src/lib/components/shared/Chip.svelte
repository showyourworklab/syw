<script lang="ts">
	import type { Snippet } from 'svelte'
	import { classNames } from 'syw-common/helpers/ui'
	import type { ChipProps } from 'syw-common/types/components'
	import Icon from '$lib/components/shared/Icon.svelte'

	const {
		href,
		overline,
		icon,
		className,
		children
	}: ChipProps & { children?: Snippet } = $props()
</script>

<svelte:element
	this={href ? 'a' : 'span'}
	href={href ?? undefined}
	target={href ? '_blank' : undefined}
	rel={href ? 'noopener noreferrer' : undefined}
	class={classNames(
		'Chip',
		href ? 'Chip_link' : null,
		className,
	)}
>
	{#if overline}
		<span
			class={classNames('ChipOverline')}
		>
			{overline}
		</span>
	{/if}
	<span
		class={classNames('ChipLabel')}
	>
		{#if icon}
			<Icon
				type={icon}
				className={classNames('ChipIcon')}
			/>
		{/if}
		{@render children?.()}
	</span>
</svelte:element>
