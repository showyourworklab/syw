<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import ProvenanceToggle from '$lib/components/provenance/ProvenanceToggle.svelte'
</script>

<div
	class={classNames('FigureCutline')}
>
	<div
		class={classNames('FigureCutlineToggles')}
	>
		<ProvenanceToggle />
	</div>
</div>
