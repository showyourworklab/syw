<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import type { ManifestGeneratorEntry } from 'syw-common/types/data'

	const {
		name,
		icon,
	}: ManifestGeneratorEntry = $props()
</script>

<div
	class={classNames('Generator')}
>
	{#if icon}
		<img
			alt=""
			src={icon}
			class={classNames('GeneratorIcon')}
		/>
	{/if}
	<span>
		{name}
	</span>
</div>
