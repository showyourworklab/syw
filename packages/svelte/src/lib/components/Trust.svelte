<script lang="ts">
	import type { TrustProps } from 'syw-common/types/components'
	import { classNames } from 'syw-common/helpers/ui'
    import { TRUST_KEYS } from 'syw-common/constants/data';
	import { getI18nContext } from '$lib/store/i18n.js'
    import Icon from './Icon.svelte';

	const { locale, getText } = getI18nContext();

	const { manifest }: TrustProps = $props()

	const isNotTrusted = $derived(manifest.trust.value !== TRUST_KEYS.TRUSTED)
</script>

{#if isNotTrusted}
	<div
		class={classNames(
			'Trust',
			`Trust_${manifest.trust.value}`,
		)}
	>
		<div
			class={classNames('TrustLabel')}
		>
			<Icon
				type={manifest.trust.value}
				className={classNames('TrustIcon')}
			/>
			<span>
				{getText($locale, 'trust', manifest.trust.value)}
			</span>
		</div>
		<!-- <Tooltip
			content={getText('trust', manifest.trust.value, 'definition')}
		>
			<Icon
				type="info"
				class={classNames('TrustLabelTooltipIcon')}
			/>
		</Tooltip> -->
		<p
			class={classNames('TrustDefinition')}
		>
			{getText($locale, 'trust', manifest.trust.value, 'definition')}
		</p>
	</div>
{/if}