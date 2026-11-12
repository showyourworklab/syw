<script lang="ts">
	import type { ManifestSectionIdentityProps } from 'syw-common/types/components'
	import { classNames } from 'syw-common/helpers/ui'
	import { getI18nContext } from '$lib/store/i18n.js'
	import { getDataContext } from '$lib/store/data.js'
	import ManifestSection from '$lib/components/manifest/ManifestSection.svelte'
	import ManifestDetail from '$lib/components/manifest/ManifestDetail.svelte'

	const { locale, getText } = getI18nContext()
	const { mediaType } = getDataContext()

	const { manifest }: ManifestSectionIdentityProps = $props()

	const typeKey = $derived(manifest.type?.key ?? 'unknown')
	const identity = $derived(manifest.identity)
	const producer = $derived(manifest.producer)
</script>

{#if identity || producer}
	<ManifestSection
		title={getText($locale, 'section', 'identity')}
		titleIcon="section_identity"
		className={classNames('ManifestSectionIdentity')}
	>
		{#if identity}
			<ManifestDetail
				title={getText($locale, 'identity', 'name')}
				titleIcon="identity"
				value={identity.value}
				trust={identity.trust}
				className={classNames('ManifestSectionIdentityName')}
			/>
		{/if}
		{#if producer}
			<ManifestDetail
				title={getText($locale, 'producer', typeKey, $mediaType)}
				titleIcon="producer"
				value={producer.value.join(', ')}
				trust={producer.trust}
				className={classNames('ManifestSectionIdentityProducer')}
			/>
		{/if}
	</ManifestSection>
{/if}
