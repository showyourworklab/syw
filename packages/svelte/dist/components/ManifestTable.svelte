<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import type { ManifestTableProps } from 'syw-common/types/components'
	import { getI18nContext } from '../store/i18n.js'
	import ManifestTableDetail from './ManifestTableDetail.svelte'
	import ManifestSection from './ManifestSection.svelte'

	const { locale, getText } = getI18nContext()

	const {
		keys = [],
		manifest
	}: ManifestTableProps = $props()
</script>

<ManifestSection
	title={getText($locale, 'section', 'table')}
	className={classNames('ManifestTable')}
>
	<div
		class={classNames('ManifestTableDetails')}
	>
		{#each keys as key}
			<ManifestTableDetail
				type={key}
				manifest={manifest}
			/>
		{/each}
</div>
</ManifestSection>
