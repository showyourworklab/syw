<script lang="ts">
	import type { Snippet } from 'svelte'
	import { classNames } from 'syw-common/helpers/ui'
	import type { ManifestSectionProps } from 'syw-common/types/components'
	import ManifestDetail from '$lib/components/manifest/ManifestDetail.svelte'
	import Icon from '$lib/components/shared/Icon.svelte'

	const {
		title,
		titleIcon,
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
					{#if titleIcon}
						<Icon
							type={titleIcon}
							className={classNames('ManifestSectionTitleIcon')}
						/>
					{/if}
					<span>
						{title}
					</span>
				</div>
			{/if}
			{#if definition}
				<ManifestDetail
					className={classNames('ManifestSectionDefinition')}
				>
					{definition}
				</ManifestDetail>
			{/if}
		</div>
	{/if}
	<div
		class={classNames('ManifestSectionContent')}
	>
		{@render children?.()}
	</div>
</section>
