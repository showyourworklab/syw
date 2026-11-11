<script lang="ts">
	import type { Snippet } from 'svelte'
	import { classNames } from 'syw-common/helpers/ui'
	import type { ManifestDetailProps } from 'syw-common/types/components'
	import { getI18nContext } from '../../store/i18n.js'
	import Collapse from '../shared/Collapse.svelte'
	import ManifestDetailHeader from './ManifestDetailHeader.svelte'
	import ManifestDetailDefinition from './ManifestDetailDefinition.svelte'

	const {
		open,
		title,
		definition,
		titleIcon,
		value,
		trust,
		onToggle,
		className,
		children
	}: ManifestDetailProps & { value?: string | Snippet | null, children?: Snippet } = $props()

	const { locale, getText } = getI18nContext()

	let innerOpen = $state(false)
	// Titled details open when they have something to show
	const isToggleable = $derived(!!title && !!(children || definition || trust))
	// Callers can control whether it's open, otherwise it keeps its own state
	const isOpen = $derived(open ?? innerOpen)
	// The definition ends with how far the value can be trusted
	const fullDefinition = $derived([
		definition,
		trust ? getText($locale, 'trust', trust.source, trust.level, 'definition') : null,
	].filter(Boolean).join(' '))

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
	{#if title}
		<ManifestDetailHeader
			open={isOpen}
			title={title}
			titleIcon={titleIcon}
			value={value}
			trust={trust}
			onToggle={isToggleable ? handleToggle : undefined}
		/>
	{/if}
	{#if isToggleable}
		<Collapse
			open={isOpen}
		>
			<div
				class={classNames('ManifestDetailBody')}
			>
				{@render children?.()}
				{#if fullDefinition}
					<ManifestDetailDefinition>
						{fullDefinition}
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
