<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import FigureMedia from '$lib/components/figure/FigureMedia.svelte'
	import FigureCutline from '$lib/components/figure/FigureCutline.svelte'
	import FigureCaption from '$lib/components/figure/FigureCaption.svelte'
</script>

<figure
	class={classNames('Figure')}
>
	<FigureMedia />
	<FigureCutline />
	<FigureCaption />
</figure>
