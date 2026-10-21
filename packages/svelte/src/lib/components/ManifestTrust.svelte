<script lang="ts">
	import type { ManifestTrustProps } from 'syw-common/types/components'
	import { TRUST_KEYS } from 'syw-common/constants/data'
	import { classNames } from 'syw-common/helpers/ui'
	import { getI18nContext } from '$lib/store/i18n.js'
	import Detail from './Detail.svelte'
	import ManifestSection from './ManifestSection.svelte'

	const { locale, getText } = getI18nContext()

	const { manifest }: ManifestTrustProps = $props()

	const isNotTrusted = $derived(manifest.trust.value !== TRUST_KEYS.TRUSTED)
</script>

<ManifestSection
	title={getText($locale, 'section', 'trust')}
	className={classNames('ManifestTrust')}
>
	<Detail
		title={getText($locale, 'trust', manifest.trust.value)}
		titleIcon={manifest.trust.value}
		footer={getText($locale, 'trust', manifest.trust.value, 'definition')}
		hasBackground
		className={classNames(
			'ManifestTrustDetail',
			`ManifestTrustDetail_${manifest.trust.value}`,
		)}
	/>
</ManifestSection>
