<script lang="ts">
	import type { ManifestTrustProps } from 'syw-common/types/components'
	import { TRUST_KEYS } from 'syw-common/constants/data'
	import { classNames } from 'syw-common/helpers/ui'
	import { getI18nContext } from '$lib/store/i18n.js'
	import Icon from './Icon.svelte'
	import ManifestSection from './ManifestSection.svelte'

	const { locale, getText } = getI18nContext()

	const { manifest }: ManifestTrustProps = $props()

	const isNotTrusted = $derived(manifest.trust.value !== TRUST_KEYS.TRUSTED)
</script>

<ManifestSection
	title={getText($locale, 'section', 'trust')}
	className={classNames('ManifestTrust')}
>
	{#if isNotTrusted}
		<div
			class={classNames(
				'ManifestTrustFlag',
				`ManifestTrustFlag_${manifest.trust.value}`,
			)}
		>
			<div
				class={classNames('ManifestTrustFlagLabel')}
			>
				<Icon
					type={manifest.trust.value}
					className={classNames('ManifestTrustFlagIcon')}
				/>
				<span>
					{getText($locale, 'trust', manifest.trust.value)}
				</span>
			</div>
			<!-- <Tooltip
				content={getText($locale, 'trust', manifest.trust.value, 'definition')}
			>
				<Icon
					type="info"
					className={classNames('ManifestTrustLabelTooltipIcon')}
				/>
			</Tooltip> -->
			<p
				class={classNames('ManifestTrustFlagDefinition')}
			>
				{getText($locale, 'trust', manifest.trust.value, 'definition')}
			</p>
		</div>
	{/if}
</ManifestSection>
