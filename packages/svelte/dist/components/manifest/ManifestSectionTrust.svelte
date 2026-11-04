<script lang="ts">
	import type { ManifestSectionTrustProps } from 'syw-common/types/components'
	import { classNames } from 'syw-common/helpers/ui'
	import { getI18nContext } from '../../store/i18n.js'
	import { getDataContext } from '../../store/data.js'
	import ManifestDetail from './ManifestDetail.svelte'
	import ManifestSection from './ManifestSection.svelte'
	import Icon from '../shared/Icon.svelte'

	const { locale, getText } = getI18nContext()
	const { mediaType } = getDataContext()

	const { manifest }: ManifestSectionTrustProps = $props()

	let infoOpen = $state(false)

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
			title={getText($locale, 'trust')}
			titleIcon={signer}
			definition={getText($locale, 'trust', signer, 'definition')}
			className={classNames(
				'ManifestSectionTrustDetail',
				`ManifestSectionTrustDetail_${signer}`,
			)}
			open={infoOpen}
			value={getText($locale, 'trust', signer)}
			prompt={getText($locale, 'trust', 'info', infoOpen ? 'hide' : 'show')}
			onToggle={() => infoOpen = !infoOpen}
		>
			<div
				class={classNames('ManifestSectionTrustInfo')}
			>
				{#if manifest.signator}
					<div
						class={classNames('ManifestSectionTrustSignator')}
					>
						<Icon
							type="signator"
							className={classNames('ManifestSectionTrustSignatorIcon')}
						/>
						<span
							class={classNames('ManifestSectionTrustSignatorTitle')}
						>
							{getText($locale, 'signator', typeKey)}
						</span>
						<span
							class={classNames('ManifestSectionTrustSignatorValue')}
						>
							{manifest.signator}
						</span>
					</div>
				{/if}
			</div>
		</ManifestDetail>
	{/if}
</ManifestSection>
