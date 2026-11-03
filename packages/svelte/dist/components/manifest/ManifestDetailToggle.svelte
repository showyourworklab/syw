<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import type { ManifestDetailToggleProps } from 'syw-common/types/components'
	import Icon from '../shared/Icon.svelte'

	const { open, value, subtitle, onToggle, className }: ManifestDetailToggleProps = $props()
</script>

<button
	type="button"
	aria-expanded={open}
	class={classNames('ManifestDetailToggle', className)}
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
