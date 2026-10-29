<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import { getI18nContext } from '$lib/store/i18n.js'

	const { locale, getText } = getI18nContext()
</script>

<div
	class={classNames('ProvenanceLoading')}
>
	<span>
		{getText($locale, 'provenance', 'loading')}
	</span>
</div>
