<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import type { ManifestTableProps } from 'syw-common/types/components'
	import { getI18nContext } from '$lib/store/i18n.js'
	import ManifestTableRow from './ManifestTableRow.svelte'
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
	<ul
		class={classNames('ManifestTableRows')}
	>
		{#each keys as key}
			<ManifestTableRow
				type={key}
				manifest={manifest}
			/>
		{/each}
	</ul>
</ManifestSection>
