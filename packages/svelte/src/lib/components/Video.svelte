<script lang="ts">
	import { onMount } from 'svelte';
	import { classNames } from 'syw-common/helpers/ui'
	import { getDataContext } from '$lib/store/data.js'

	let mounted = $state(false);
	const { src, alt } = getDataContext()

	onMount(async () => {
		await import('@videojs/html/video/player');
		await import('@videojs/html/video/skin');
		await import('@videojs/html/video/skin.css');
		mounted = true;
	});

</script>

<div
	class={classNames('Video')}
>
	{#if mounted}
		<video-player>
			<video-skin
				class={classNames('VideoSkin')}
			>
				<!-- svelte-ignore a11y_media_has_caption -->
				<video
					src={$src}
					aria-label={$alt}
					slot="media"
					class={classNames('Video')}
				>
					<!-- <track kind="captions"> -->
				</video>
			</video-skin>
		</video-player>
	{/if}
</div>
