<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import { getI18nContext } from '../../store/i18n.js'

	const { locale, getText } = getI18nContext()
</script>

<div
	class={classNames('ProvenanceEmpty')}
>
	<span>
		{getText($locale, 'provenance', 'empty')}
	</span>
</div>
