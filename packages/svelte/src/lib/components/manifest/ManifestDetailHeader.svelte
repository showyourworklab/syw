<script lang="ts">
	import type { Snippet } from 'svelte'
	import { classNames } from 'syw-common/helpers/ui'
	import type { ManifestDetailHeaderProps } from 'syw-common/types/components'
	import Icon from '$lib/components/shared/Icon.svelte'

	const {
		open,
		title,
		titleIcon,
		value,
		onToggle,
		className,
	}: ManifestDetailHeaderProps & { value?: string | Snippet | null } = $props()
</script>

<svelte:element
	this={onToggle ? 'button' : 'div'}
	type={onToggle ? 'button' : undefined}
	aria-expanded={onToggle ? open : undefined}
	onclick={onToggle}
	role={onToggle ? undefined : 'group'}
	class={classNames(
		'ManifestDetailHeader',
		onToggle ? 'ManifestDetailToggle' : null,
		className,
	)}
>
	<span
		class={classNames('ManifestDetailTitle')}
	>
		{#if titleIcon}
			<Icon
				type={titleIcon}
				className={classNames('ManifestDetailTitleIcon')}
			/>
		{/if}
		<span
			class={classNames('ManifestDetailTitleText')}
		>
			{title}
		</span>
	</span>
	<span
		class={classNames('ManifestDetailValue')}
	>
		<span
			class={classNames('ManifestDetailValueText')}
		>
			{#if typeof value === 'function'}
				{@render value()}
			{:else}
				{value}
			{/if}
		</span>
	</span>
	{#if onToggle}
		<span
			class={classNames('ManifestDetailToggleIcon')}
		>
			<Icon
				type={open ? 'up' : 'down'}
			/>
		</span>
	{/if}
</svelte:element>
