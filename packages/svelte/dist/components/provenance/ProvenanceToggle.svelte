<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import { getDataContext } from '../../store/data.js'
	import { getI18nContext } from '../../store/i18n.js'
	import { getUiContext } from '../../store/ui.js'
	import Icon from '../shared/Icon.svelte'

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
