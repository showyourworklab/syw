<script lang="ts">
	import type { Snippet } from 'svelte'
	import { classNames } from 'syw-common/helpers/ui'
	import type { ManifestSectionProps } from 'syw-common/types/components'
    import Detail from './Detail.svelte'

	const {
		title,
		definition,
		className,
		children
	}: ManifestSectionProps & { children?: Snippet } = $props()
</script>

<section
	class={classNames('ManifestSection', className)}
>
	{#if title || definition}
		<div
			class={classNames('ManifestSectionHeader')}
		>
			{#if title}
				<div
					class={classNames('ManifestSectionTitle')}
				>
					{title}
				</div>
			{/if}
			{#if definition}
				<Detail
					className={classNames('ManifestSectionDefinition')}
				>
					{definition}
				</Detail>
			{/if}
		</div>
	{/if}
	<div
		class={classNames('ManifestSectionContent')}
	>
		{@render children?.()}
	</div>
</section>
