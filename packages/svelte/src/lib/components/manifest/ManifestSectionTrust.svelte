<script lang="ts">
	import type { ManifestSectionTrustProps } from 'syw-common/types/components'
	import { classNames } from 'syw-common/helpers/ui'
	import { getI18nContext } from '$lib/store/i18n.js'
	import { getDataContext } from '$lib/store/data.js'
	import ManifestDetail from '$lib/components/manifest/ManifestDetail.svelte'
	import ManifestSection from '$lib/components/manifest/ManifestSection.svelte'

	const { locale, getText, getMediaText } = getI18nContext()
	const { mediaType } = getDataContext()

	const { manifest }: ManifestSectionTrustProps = $props()

	const typeKey = $derived(manifest.type?.key ?? 'unknown')
</script>

<ManifestSection
	title={getText($locale, 'section', 'trust')}
	titleIcon="section_trust"
	definition={getMediaText($locale, $mediaType, 'section', 'trust', 'definition')}
	className={classNames('ManifestSectionTrust')}
>
	<ManifestDetail
		title={getText($locale, 'trust', manifest.trust.value)}
		titleIcon={manifest.trust.value}
		titleTooltip={getText($locale, 'trust', 'definition')}
		footer={getText($locale, 'trust', manifest.trust.value, 'definition')}
		className={classNames(
			'ManifestSectionTrustDetail',
			`ManifestSectionTrustDetail_${manifest.trust.value}`,
		)}
	/>
	{#if manifest.signator}
		<ManifestDetail
			title={getText($locale, 'signator', typeKey)}
			titleIcon="signator"
			titleTooltip={getMediaText($locale, $mediaType, 'signator', typeKey, 'definition')}
			className={classNames('ManifestSectionTrustSignator')}
		>
			{manifest.signator}
		</ManifestDetail>
	{/if}
</ManifestSection>
