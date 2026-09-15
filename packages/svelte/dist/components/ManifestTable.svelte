<script lang="ts">
	import { classNames } from 'syw-common/helpers'
	import type { ManifestTableProps } from 'syw-common/types/components'
	import ManifestTableRow from './ManifestTableRow.svelte'

	const {
		keys = [],
		manifest
	}: ManifestTableProps = $props()
</script>

<ul
	class={classNames('ManifestTable')}
>
	{#each keys as key}
		<ManifestTableRow
			type={key}
			manifest={manifest}
		/>
	{/each}
</ul>
