<script lang="ts">
	import type { ManifestSectionTrustProps } from 'syw-common/types/components'
	import { classNames } from 'syw-common/helpers/ui'
	import { getI18nContext } from '../../store/i18n.js'
	import { getDataContext } from '../../store/data.js'
	import ManifestDetail from './ManifestDetail.svelte'
	import ManifestSection from './ManifestSection.svelte'

	const { locale, getText } = getI18nContext()
	const { mediaType } = getDataContext()

	const { manifest }: ManifestSectionTrustProps = $props()

	const typeKey = $derived(manifest.type?.key ?? 'unknown')
	const signer = $derived(manifest.validation?.signer)
</script>

<ManifestSection
	title={getText($locale, 'section', 'trust')}
	titleIcon="section_trust"
	definition={getText($locale, 'section', 'trust', 'definition', $mediaType)}
	className={classNames('ManifestSectionTrust')}
>
	{#if signer}
		<ManifestDetail
			title={getText($locale, 'trust', signer)}
			titleIcon={signer}
			titleTooltip={getText($locale, 'trust', 'definition')}
			footer={getText($locale, 'trust', signer, 'definition')}
			className={classNames(
				'ManifestSectionTrustDetail',
				`ManifestSectionTrustDetail_${signer}`,
			)}
		/>
	{/if}
	{#if manifest.signator}
		<ManifestDetail
			title={getText($locale, 'signator', typeKey)}
			titleIcon="signator"
			titleTooltip={getText($locale, 'signator', typeKey, 'definition', $mediaType)}
			className={classNames('ManifestSectionTrustSignator')}
		>
			{manifest.signator}
		</ManifestDetail>
	{/if}
</ManifestSection>
