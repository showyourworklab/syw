<script lang="ts">
	import type { Snippet } from 'svelte'
	import { classNames } from 'syw-common/helpers/ui'
	import type { ManifestDetailProps } from 'syw-common/types/components'
	import ManifestDetailDefinition from './ManifestDetailDefinition.svelte'
	import Collapse from '../shared/Collapse.svelte'
	import Icon from '../shared/Icon.svelte'

	const {
		open,
		title,
		definition,
		titleIcon,
		value,
		prompt,
		onToggle,
		className,
		children
	}: ManifestDetailProps & { value?: string | Snippet | null, children?: Snippet } = $props()

	let innerOpen = $state(false)
	// Titled details open to show their definition and children
	const isToggleable = $derived(!!title)
	// Callers can control whether it's open, otherwise it keeps its own state
	const isOpen = $derived(open ?? innerOpen)

	const handleToggle = () => {
		if(open === undefined) innerOpen = !innerOpen
		onToggle?.()
	}
</script>

<div
	class={classNames(
		'ManifestDetail',
		isToggleable ? 'ManifestDetail_toggleable' : null,
		isToggleable && isOpen ? 'ManifestDetail_open' : null,
		className,
	)}
>
	{#if isToggleable}
		<button
			type="button"
			aria-expanded={isOpen}
			class={classNames('ManifestDetailToggle')}
			onclick={handleToggle}
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
				{#if typeof value === 'function'}
					{@render value()}
				{:else}
					{value}
				{/if}
			</span>
			<!-- {#if prompt}
				<span
					class={classNames('ManifestDetailPrompt')}
				>
					{prompt}
				</span>
			{/if} -->
			<span
				class={classNames('ManifestDetailToggleIcon')}
			>
				<Icon
					type={isOpen ? 'up' : 'down'}
				/>
			</span>
		</button>
		<Collapse
			open={isOpen}
		>
			<div
				class={classNames('ManifestDetailBody')}
			>
				{@render children?.()}
				{#if definition}
					<ManifestDetailDefinition>
						{definition}
					</ManifestDetailDefinition>
				{/if}
			</div>
		</Collapse>
	{:else if children}
		<div
			class={classNames('ManifestDetailBody')}
		>
			{@render children()}
		</div>
	{/if}
</div>
