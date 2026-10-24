<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import { getDataContext } from '$lib/store/data.js'
	import { getI18nContext } from '$lib/store/i18n.js'
	import { getUiContext } from '$lib/store/ui.js'
	import Icon from '$lib/components/shared/Icon.svelte'

	const { locale, getMediaText } = getI18nContext();
	const { mediaType } = getDataContext();
	const { isProvenanceOpen, openProvenance, closeProvenance } = getUiContext();

	const handleClick = (event: MouseEvent) => {
		if($isProvenanceOpen) {
			closeProvenance(event)
		} else {
			openProvenance(event)
		}
	}

</script>

<button
	aria-pressed={$isProvenanceOpen}
	class={classNames('ProvenanceToggle')}
	onclick={handleClick}
>
	<Icon
		type="signal"
	/>
	<span>
		{getMediaText($locale, $mediaType, 'provenance', 'toggle')}
	</span>
</button>
