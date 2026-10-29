<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import { isDataLoading } from 'syw-common/helpers/data'
	import { getDataContext } from '$lib/store/data.js'
	import { getUiContext } from '$lib/store/ui.js'

	import Manifest from '$lib/components/manifest/Manifest.svelte'
    import ProvenanceExplainer from '$lib/components/provenance/ProvenanceExplainer.svelte';
    import ProvenanceExplainerToggle from '$lib/components/provenance/ProvenanceExplainerToggle.svelte';
    import ProvenanceVerify from '$lib/components/provenance/ProvenanceVerify.svelte';
    import ProvenanceLoading from '$lib/components/provenance/ProvenanceLoading.svelte';
    import ProvenanceEmpty from '$lib/components/provenance/ProvenanceEmpty.svelte';

	const { phase, src, manifests } = getDataContext();
	const { isProvenanceOpen } = getUiContext();

	let firstPreviewEl: HTMLElement | null = $state(null)

	$effect(() => {
		if($isProvenanceOpen && firstPreviewEl) firstPreviewEl.focus()
	})

</script>

<div
	class={classNames('Provenance')}
>
	{#if $manifests && $manifests.length}
		<div
			class={classNames('ProvenanceList')}
		>
			{#key $manifests}
				{#each $manifests as manifest, index}
					<Manifest
						manifest={manifest}
						previewRef={index === 0 ? (el) => firstPreviewEl = el : null}
					/>
				{/each}
			{/key}
		</div>
	{:else if isDataLoading({ phase: $phase, src: $src })}
		<ProvenanceLoading />
	{:else}
		<ProvenanceEmpty />
	{/if}
	<div
		class={classNames('ProvenanceFooter')}
	>
		<ProvenanceExplainerToggle />
		<ProvenanceVerify />
	</div>
	<ProvenanceExplainer />
</div>
