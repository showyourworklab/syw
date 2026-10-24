<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import type { DetailToggleProps } from 'syw-common/types/components'
	import Icon from './Icon.svelte'

	const { open, value, subtitle, onToggle, className }: DetailToggleProps = $props()
</script>

<button
	type="button"
	aria-expanded={open}
	class={classNames('DetailToggle', className)}
	onclick={onToggle}
>
	<span
		class={classNames('DetailToggleText')}
	>
		<span
			class={classNames('DetailToggleValue')}
		>
			{value}
		</span>
		{#if subtitle}
			<span
				class={classNames('DetailToggleSubtitle')}
			>
				{subtitle}
			</span>
		{/if}
	</span>
	<Icon
		type={open ? 'up' : 'down'}
	/>
</button>
