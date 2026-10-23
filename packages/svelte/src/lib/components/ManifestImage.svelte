<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import type { ManifestImageProps } from 'syw-common/types/components'
	import Icon from './Icon.svelte'

	const { manifest, className }: ManifestImageProps = $props()

	// Aspect ratio of the loaded thumbnail, kept with its src so a new thumbnail starts unsized
	let loaded = $state<{ src: string, ratio: number } | null>(null)
	const ratio = $derived(loaded && loaded.src === manifest?.thumbnail ? loaded.ratio : null)

	const handleLoad = (event: Event) => {
		const { naturalWidth, naturalHeight } = event.currentTarget as HTMLImageElement
		if(manifest?.thumbnail && naturalWidth && naturalHeight) {
			loaded = { src: manifest.thumbnail, ratio: naturalWidth / naturalHeight }
		}
	}
</script>

<div
	class={classNames(
		'ManifestImage',
		!manifest?.thumbnail ? 'ManifestImage_missing' : null,
		ratio ? 'ManifestImage_sized' : null,
		className,
	)}
	style={ratio ? `--syw-manifest-image-ratio: ${ratio}` : undefined}
>
	{#if manifest?.thumbnail}
		<img
			alt=''
			src={manifest.thumbnail}
			class={classNames('ManifestImageThumbnail')}
			onload={handleLoad}
		/>
	{:else}
		<Icon type="missing" />
	{/if}
</div>
