<script lang="ts">
	import type { ManifestSectionIdentityProps } from 'syw-common/types/components'
	import { classNames } from 'syw-common/helpers/ui'
	import { getI18nContext } from '../../store/i18n.js'
	import ManifestSection from './ManifestSection.svelte'
	import Detail from '../shared/Detail.svelte'

	const { locale, getText } = getI18nContext()

	const { manifest }: ManifestSectionIdentityProps = $props()
</script>

{#if manifest.identity}
	<ManifestSection
		title={getText($locale, 'section', 'identity')}
		className={classNames('ManifestSectionIdentity')}
	>
		<Detail
			title={getText($locale, 'identity', 'name')}
			className={classNames('ManifestSectionIdentityName')}
		>
			{manifest.identity.name}
		</Detail>
	</ManifestSection>
{/if}