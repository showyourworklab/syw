<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import { isDataLoading } from 'syw-common/helpers/data'
	import { getDataContext } from '../../store/data.js'
	import { getUiContext } from '../../store/ui.js'

	import Manifest from '../manifest/Manifest.svelte'
    import ProvenanceExplainer from './ProvenanceExplainer.svelte';
    import ProvenanceExplainerToggle from './ProvenanceExplainerToggle.svelte';
    import ProvenanceVerify from './ProvenanceVerify.svelte';
    import ProvenanceLoading from './ProvenanceLoading.svelte';
    import ProvenanceEmpty from './ProvenanceEmpty.svelte';

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
