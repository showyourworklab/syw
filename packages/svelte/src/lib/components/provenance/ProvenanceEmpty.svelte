<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import { PHASE_KEYS } from 'syw-common/constants/data'
	import { getI18nContext } from '$lib/store/i18n.js'
	import { getDataContext } from '$lib/store/data.js'

	const { locale, getText } = getI18nContext()
	const { phase } = getDataContext()
</script>

<div
	class={classNames('ProvenanceEmpty')}
>
	<span>
		{getText($locale, 'provenance', $phase === PHASE_KEYS.ERROR ? 'error' : 'empty')}
	</span>
</div>
