<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import { getI18nContext } from '$lib/store/i18n.js'
	import { getDataContext } from '$lib/store/data.js'

	const { locale, getText } = getI18nContext()
	const { mediaType } = getDataContext()
</script>

<div
	class={classNames('ProvenanceEmpty')}
>
	<span
		class={classNames('ProvenanceEmptyTitle')}
	>
		{getText($locale, 'provenance', 'empty', $mediaType)}
	</span>
	<p
		class={classNames('ProvenanceEmptyDefinition')}
	>
		{getText($locale, 'provenance', 'empty', 'definition', $mediaType)}
	</p>
</div>
