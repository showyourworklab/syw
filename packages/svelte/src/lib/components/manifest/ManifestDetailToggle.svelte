<script lang="ts">
	import type { Snippet } from 'svelte'
	import { classNames } from 'syw-common/helpers/ui'
	import type { ManifestDetailToggleProps } from 'syw-common/types/components'
	import Collapse from '$lib/components/shared/Collapse.svelte'
	import Icon from '$lib/components/shared/Icon.svelte'

	const { open, value, subtitle, onToggle, className, children }: ManifestDetailToggleProps & { children: Snippet } = $props()
</script>

<div
	class={classNames(
		'ManifestDetailToggle',
		open ? 'ManifestDetailToggle_open' : null,
		className,
	)}
>
	<button
		type="button"
		aria-expanded={open}
		class={classNames('ManifestDetailToggleButton')}
		onclick={onToggle}
	>
		<span
			class={classNames('ManifestDetailToggleText')}
		>
			<span
				class={classNames('ManifestDetailToggleValue')}
			>
				{value}
			</span>
			{#if subtitle}
				<span
					class={classNames('ManifestDetailToggleSubtitle')}
				>
					{subtitle}
				</span>
			{/if}
		</span>
		<Icon
			type={open ? 'up' : 'down'}
		/>
	</button>
	<Collapse
		open={open}
	>
		<div
			class={classNames('ManifestDetailToggleContent')}
		>
			{@render children()}
		</div>
	</Collapse>
</div>
