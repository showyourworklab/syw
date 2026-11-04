<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import { getI18nContext } from '$lib/store/i18n.js'
	import Loader from '$lib/components/shared/Loader.svelte'

	const { locale, getText } = getI18nContext()
</script>

<div
	class={classNames('ProvenanceLoading')}
>
	<Loader
		loading={true}
		className={classNames('ProvenanceLoadingLoader')}
	/>
	<span>
		{getText($locale, 'provenance', 'loading')}
	</span>
</div>
