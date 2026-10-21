<script lang="ts">
	import type { Snippet } from 'svelte'
	import { classNames } from 'syw-common/helpers/ui'
	import type { ManifestSectionProps } from 'syw-common/types/components'

	const {
		title,
		className,
		children
	}: ManifestSectionProps & { children?: Snippet } = $props()
</script>

<section
	class={classNames('ManifestSection', className)}
>
	{#if title}
		<div
			class={classNames('ManifestSectionTitle')}
		>
			{title}
		</div>
	{/if}
	{@render children?.()}
</section>
