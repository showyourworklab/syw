<script lang="ts">
	import type { ManifestTrustProps } from 'syw-common/types/components'
	import { classNames } from 'syw-common/helpers/ui'
	import { getI18nContext } from '../store/i18n.js'
	import Detail from './Detail.svelte'
	import ManifestSection from './ManifestSection.svelte'

	const { locale, getText } = getI18nContext()

	const { manifest }: ManifestTrustProps = $props()

	const typeKey = $derived(manifest.type?.key ?? 'unknown')
</script>

<ManifestSection
	title={getText($locale, 'section', 'trust')}
	definition={getText($locale, 'section', 'trust', 'definition')}
	className={classNames('ManifestTrust')}
>
	{#if manifest.signator}
		<Detail
			title={getText($locale, 'signator', typeKey)}
			titleTooltip={getText($locale, 'signator', typeKey, 'definition')}
			className={classNames('ManifestTrustSignator')}
		>
			{manifest.signator}
		</Detail>
	{/if}
	<Detail
		title={getText($locale, 'trust', manifest.trust.value)}
		titleIcon={manifest.trust.value}
		footer={getText($locale, 'trust', manifest.trust.value, 'definition')}
		className={classNames(
			'ManifestTrustDetail',
			`ManifestTrustDetail_${manifest.trust.value}`,
		)}
	/>
</ManifestSection>
