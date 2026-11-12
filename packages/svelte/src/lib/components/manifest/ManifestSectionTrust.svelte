<script lang="ts">
	import type { ManifestSectionTrustProps } from 'syw-common/types/components'
	import { classNames } from 'syw-common/helpers/ui'
	import { getI18nContext } from '$lib/store/i18n.js'
	import { getDataContext } from '$lib/store/data.js'
	import ManifestSection from '$lib/components/manifest/ManifestSection.svelte'

	const { locale, getText } = getI18nContext()
	const { mediaType } = getDataContext()

	const { className }: ManifestSectionTrustProps = $props()
</script>

<ManifestSection
	title={getText($locale, 'section', 'trust')}
	titleIcon="section_trust"
	definition={getText($locale, 'section', 'trust', 'definition', $mediaType)}
	className={classNames('ManifestSectionTrust', className)}
/>
