<script lang="ts">
	import type { Snippet } from 'svelte'
	import { classNames } from 'syw-common/helpers/ui'
	import type { ManifestDetailNoteProps } from 'syw-common/types/components'
	import Icon from '../shared/Icon.svelte'

	const { icon, className, children }: ManifestDetailNoteProps & { children: Snippet } = $props()
</script>

<span
	class={classNames('ManifestDetailNote', className)}
>
	<Icon
		type={icon}
		className={classNames('ManifestDetailNoteIcon')}
	/>
	<span
		class={classNames('ManifestDetailNoteText')}
	>
		{@render children()}
	</span>
</span>
