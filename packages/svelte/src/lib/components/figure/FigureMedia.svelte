<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import { getDataContext } from '$lib/store/data.js'
    import Image from '$lib/components/shared/Image.svelte';
    import Video from '$lib/components/shared/Video.svelte';

	const {
		mediaType
	} = getDataContext()

</script>

<div
	class={classNames('FigureMedia')}
>
	<!-- Anything that isn't a video is shown as an image -->
	{#if $mediaType === "video"}
		<Video />
	{:else}
		<Image />
	{/if}
</div>
