<script lang="ts">
	import type { Snippet } from 'svelte'
	import { classNames } from 'syw-common/helpers/ui'
	import type { DetailProps } from 'syw-common/types/components'
	import Tooltip from './Tooltip.svelte'
	import Icon from './Icon.svelte'

	const {
		title,
		titleTooltip,
		titleIcon,
		footer,
		noBackground,
		className,
		children
	}: DetailProps & { children?: Snippet } = $props()
</script>

<div
	class={classNames(
		'Detail',
		noBackground ? 'Detail_noBackground' : null,
		className,
	)}
>
	{#if title}
		<div
			class={classNames('DetailTitle')}
		>
			{#if titleIcon}
				<Icon
					type={titleIcon}
					className={classNames('DetailTitleIcon')}
				/>
			{/if}
			<span>
				{title}
			</span>
			{#if titleTooltip}
				<Tooltip
					content={titleTooltip}
				>
					<Icon
						type="info"
						className={classNames('DetailTitleTooltipIcon')}
					/>
				</Tooltip>
			{/if}
		</div>
	{/if}
	{#if children}
		<div
			class={classNames('DetailBody')}
		>
			{@render children()}
		</div>
	{/if}
	{#if footer}
		<p
			class={classNames('DetailFooter')}
		>
			{footer}
		</p>
	{/if}
</div>
