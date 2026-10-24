<script lang="ts">
	import type { ManifestSectionIdentityProps } from 'syw-common/types/components'
	import { classNames } from 'syw-common/helpers/ui'
	import { getI18nContext } from '$lib/store/i18n.js'
	import ManifestSection from '$lib/components/manifest/ManifestSection.svelte'
	import ManifestDetail from '$lib/components/manifest/ManifestDetail.svelte'

	const { locale, getText } = getI18nContext()

	const { manifest }: ManifestSectionIdentityProps = $props()
</script>

{#if manifest.identity}
	<ManifestSection
		title={getText($locale, 'section', 'identity')}
		titleIcon="section_identity"
		className={classNames('ManifestSectionIdentity')}
	>
		<ManifestDetail
			title={getText($locale, 'identity', 'name')}
			titleIcon="identity"
			className={classNames('ManifestSectionIdentityName')}
		>
			{manifest.identity.name}
		</ManifestDetail>
	</ManifestSection>
{/if}