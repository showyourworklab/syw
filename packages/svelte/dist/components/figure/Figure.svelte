<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import FigureMedia from './FigureMedia.svelte'
	import FigureCutline from './FigureCutline.svelte'
	import FigureCaption from './FigureCaption.svelte'
</script>

<figure
	class={classNames('Figure')}
>
	<FigureMedia />
	<FigureCutline />
	<FigureCaption />
</figure>
