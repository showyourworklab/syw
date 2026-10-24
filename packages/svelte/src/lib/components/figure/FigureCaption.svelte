<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
    import Markdown from '$lib/components/shared/Markdown.svelte';
	import { getDataContext } from '$lib/store/data.js'

	const { caption, byline } = getDataContext();
</script>

{#if $caption || $byline}
	<!-- svelte-ignore a11y_figcaption_parent -->
	<figcaption
		class={classNames('FigureCaption')}
	>
		<div
			class={classNames('FigureCaptionInner')}
		>
			<Markdown
				content={$caption}
			/>
			<div
				class={classNames('FigureCaptionByline')}
			>
				{$byline}
			</div>
		</div>
	</figcaption>
{/if}
