<script lang="ts">
	import type { Snippet } from 'svelte'
	import { classNames } from 'syw-common/helpers/ui'
	import type { ManifestDetailProps } from 'syw-common/types/components'
	import { getI18nContext } from '$lib/store/i18n.js'
	import Collapse from '$lib/components/shared/Collapse.svelte'
	import ManifestDetailHeader from '$lib/components/manifest/ManifestDetailHeader.svelte'
	import ManifestDetailDefinition from '$lib/components/manifest/ManifestDetailDefinition.svelte'

	const {
		open,
		title,
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
	const isToggleable = $derived(!!title && !!(children || trust))
	// Callers can control whether it's open, otherwise it keeps its own state
	const isOpen = $derived(open ?? innerOpen)
	// The definition only states how far the value can be trusted
	const definition = $derived(trust ? getText($locale, 'trust', trust.level, 'definition') : null)

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
