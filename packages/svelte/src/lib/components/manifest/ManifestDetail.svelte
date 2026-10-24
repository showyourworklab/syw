<script lang="ts">
	import type { Snippet } from 'svelte'
	import { classNames } from 'syw-common/helpers/ui'
	import type { ManifestDetailProps } from 'syw-common/types/components'
	import Tooltip from '$lib/components/shared/Tooltip.svelte'
	import Icon from '$lib/components/shared/Icon.svelte'

	const {
		title,
		titleTooltip,
		titleIcon,
		footer,
		noBackground,
		className,
		children
	}: ManifestDetailProps & { children?: Snippet } = $props()
</script>

<div
	class={classNames(
		'ManifestDetail',
		noBackground ? 'ManifestDetail_noBackground' : null,
		className,
	)}
>
	{#if title}
		<div
			class={classNames('ManifestDetailTitle')}
		>
			{#if titleIcon}
				<Icon
					type={titleIcon}
					className={classNames('ManifestDetailTitleIcon')}
				/>
			{/if}
			<Tooltip
				content={titleTooltip ?? undefined}
			>
				<span
					class={classNames('ManifestDetailTitleText')}
				>
					{title}
				</span>
			</Tooltip>
		</div>
	{/if}
	{#if children}
		<div
			class={classNames('ManifestDetailBody')}
		>
			{@render children()}
		</div>
	{/if}
	{#if footer}
		<p
			class={classNames('ManifestDetailFooter')}
		>
			{footer}
		</p>
	{/if}
</div>
