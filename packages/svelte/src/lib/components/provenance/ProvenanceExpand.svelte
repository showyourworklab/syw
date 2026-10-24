<script lang="ts">
	import Collapse from '$lib/components/shared/Collapse.svelte'
	import Provenance from '$lib/components/provenance/Provenance.svelte'
	import { getUiContext } from '$lib/store/ui.js'

	const {
		isProvenanceOpen,
	} = getUiContext()
</script>

<Collapse
	open={$isProvenanceOpen}
>
	<Provenance />
</Collapse>
