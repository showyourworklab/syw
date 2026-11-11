<script lang="ts">
	import type { Snippet } from 'svelte'
	import { classNames } from 'syw-common/helpers/ui'
	import type { ComponentProps } from 'syw-common/types/components'
	import ManifestDetailNote from '$lib/components/manifest/ManifestDetailNote.svelte'

	const { className, children }: ComponentProps & { children: Snippet } = $props()
</script>

<ManifestDetailNote
	icon="info"
	className={classNames('ManifestDetailDefinition', className)}
>
	{@render children()}
</ManifestDetailNote>
