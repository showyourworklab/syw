<script lang="ts">
	import type { ManifestSectionTrustProps } from 'syw-common/types/components'
	import { classNames } from 'syw-common/helpers/ui'
	import { getI18nContext } from '$lib/store/i18n.js'
	import ManifestDetail from './ManifestDetail.svelte'
	import ManifestSection from './ManifestSection.svelte'

	const { locale, getText } = getI18nContext()

	const { manifest }: ManifestSectionTrustProps = $props()

	const typeKey = $derived(manifest.type?.key ?? 'unknown')
</script>

<ManifestSection
	title={getText($locale, 'section', 'trust')}
	titleIcon="section_trust"
	definition={getText($locale, 'section', 'trust', 'definition')}
	className={classNames('ManifestSectionTrust')}
>
	<ManifestDetail
		title={getText($locale, 'trust', manifest.trust.value)}
		titleIcon={manifest.trust.value}
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
			titleTooltip={getText($locale, 'signator', typeKey, 'definition')}
			className={classNames('ManifestSectionTrustSignator')}
		>
			{manifest.signator}
		</ManifestDetail>
	{/if}
</ManifestSection>
