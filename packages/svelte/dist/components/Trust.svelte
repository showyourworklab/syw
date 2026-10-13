<script lang="ts">
	import type { TrustProps } from 'syw-common/types/components'
	import { C2PA_TRUST_VALUES } from 'syw-common/constants/c2pa'
	import { classNames } from 'syw-common/helpers'
	import { getI18nContext } from '../store/i18n.js'

	const { locale, getText } = getI18nContext();

	const { manifest }: TrustProps = $props()

	const isNotTrusted = $derived(manifest.trust.value !== C2PA_TRUST_VALUES.TRUSTED)
</script>

{#if isNotTrusted}
	<div
		class={classNames(
			'Trust',
			`Trust_${manifest.trust.value}`,
		)}
	>
		<strong
			class={'TrustLabel'}
		>
			{getText($locale, 'trust', manifest.trust.value)}
		</strong>
		<p
			class={'TrustDefinition'}
		>
			{getText($locale, 'trust', manifest.trust.value, 'definition')}
		</p>
	</div>
{/if}