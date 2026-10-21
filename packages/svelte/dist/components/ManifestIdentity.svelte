<script lang="ts">
	import type { ManifestIdentityProps } from 'syw-common/types/components'
	import { classNames } from 'syw-common/helpers/ui'
	import { getI18nContext } from '../store/i18n.js'
	import ManifestSection from './ManifestSection.svelte'
	import Detail from './Detail.svelte'

	const { locale, getText } = getI18nContext()

	const { manifest }: ManifestIdentityProps = $props()
</script>

{#if manifest.identity}
	<ManifestSection
		title={getText($locale, 'section', 'identity')}
		className={classNames('ManifestIdentity')}
	>
		<Detail
			title={getText($locale, 'identity', 'name')}
			className={classNames('ManifestIdentityName')}
		>
			{manifest.identity.name}
		</Detail>
	</ManifestSection>
{/if}