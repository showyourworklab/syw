<script lang="ts">
	import type { ManifestIdentityProps } from 'syw-common/types/components'
	import { classNames } from 'syw-common/helpers/ui'
	import { getI18nContext } from '$lib/store/i18n.js'
	import ManifestSection from './ManifestSection.svelte'

	const { locale, getText } = getI18nContext()

	const { manifest }: ManifestIdentityProps = $props()
</script>

<ManifestSection
	title={getText($locale, 'section', 'identity')}
	className={classNames('ManifestIdentity')}
>
	<!-- TODO: identity content -->
</ManifestSection>
