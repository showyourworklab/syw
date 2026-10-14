<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
    import Markdown from './Markdown.svelte';
	import { getDataContext } from '$lib/store/data.js'

	const { caption, byline } = getDataContext();
</script>

{#if $caption || $byline}
	<!-- svelte-ignore a11y_figcaption_parent -->
	<figcaption
		class={classNames('Caption')}
	>
		<div
			class={classNames('CaptionInner')}
		>
			<Markdown
				content={$caption}
			/>
			<div
				class={classNames('CaptionByline')}
			>
				{$byline}
			</div>
		</div>
	</figcaption>
{/if}
