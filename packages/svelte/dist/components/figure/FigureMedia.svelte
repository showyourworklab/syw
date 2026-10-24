<script lang="ts">
	import { classNames, handleA11yClick } from 'syw-common/helpers/ui'
    import Image from '../shared/Image.svelte';
    import Video from '../shared/Video.svelte';
	import { getDataContext } from '../../store/data.js'
	import { getUiContext } from '../../store/ui.js'

	const {
		mediaType
	} = getDataContext()
	const {
		hoverImage, unhoverImage, isProvenanceOpen, openProvenance, closeProvenance
	} = getUiContext()

	const isClickableElem = (event: Event) =>
		["IMG", "VIDEO"].includes((event.target as HTMLElement)?.tagName)

	const handleClick = (event: MouseEvent) => {
		if(!isClickableElem(event)) return
		if($isProvenanceOpen) {
			closeProvenance(event)
		} else {
			openProvenance(event)
		}
	}

	const handleMouseEnter = (event: MouseEvent) => {
		hoverImage(event)
	}

	const handleMouseLeave = (event: MouseEvent) => {
		unhoverImage(event)
	}

	const handleKeyDown = (event: KeyboardEvent) => {
		if(!isClickableElem(event)) return
		if($isProvenanceOpen) {
			handleA11yClick(event, closeProvenance)
		} else {
			handleA11yClick(event, openProvenance)
		}
	}

</script>

<div
	role="button"
	tabindex="0"
	onclick={handleClick}
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
	onkeydown={handleKeyDown}
	class={classNames('FigureMedia')}
>
	<!-- Fall back to an image when the media type is unknown -->
	{#if $mediaType === "video"}
		<Video />
	{:else}
		<Image />
	{/if}
</div>
