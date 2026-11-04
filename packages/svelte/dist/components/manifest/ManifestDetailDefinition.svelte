<script lang="ts">
	import type { Snippet } from 'svelte'
	import { classNames } from 'syw-common/helpers/ui'
	import type { ComponentProps } from 'syw-common/types/components'
	import Icon from '../shared/Icon.svelte'

	const { className, children }: ComponentProps & { children: Snippet } = $props()
</script>

<p
	class={classNames('ManifestDetailDefinition', className)}
>
	<Icon
		type="info"
		className={classNames('ManifestDetailDefinitionIcon')}
	/>
	<span>
		{@render children()}
	</span>
</p>
