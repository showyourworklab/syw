<script lang="ts">
	import { classNames } from 'syw-common/helpers'
	import type { ManifestGeneratorEntry } from 'syw-common/types/c2pa'

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
