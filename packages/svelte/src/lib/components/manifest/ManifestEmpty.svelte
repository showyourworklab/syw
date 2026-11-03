<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import type { ManifestEmptyProps } from 'syw-common/types/components'
	import { getI18nContext } from '$lib/store/i18n.js'
	import ManifestDetail from '$lib/components/manifest/ManifestDetail.svelte'

	const { locale, getText } = getI18nContext()

	const { manifest, className }: ManifestEmptyProps = $props()

	const emptyKey = $derived(manifest.validation?.integrity ?? manifest.type?.key ?? null)
</script>

<div
	class={classNames('ManifestEmpty', emptyKey ? `ManifestEmpty_${emptyKey}` : null, className)}
>
	<ManifestDetail
		className={classNames('ManifestEmptyDetail')}
	>
		{getText($locale, 'empty', emptyKey)}
	</ManifestDetail>
</div>
