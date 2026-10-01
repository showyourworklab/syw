<script lang="ts">
	import { classNames } from 'syw-common/helpers'
	import { getDataContext } from '$lib/store/data.js'
	import { getI18nContext } from '$lib/store/i18n.js'
	import { getUiContext } from '$lib/store/ui.js'

	import Manifest from './Manifest.svelte'
    import Explainer from './Explainer.svelte';
    import ExplainerToggle from './ExplainerToggle.svelte';
    import ProvenanceVerify from './ProvenanceVerify.svelte';

	const { manifests } = getDataContext();
	const { locale, getText } = getI18nContext();
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
	{:else}
		<div
			class={classNames('ProvenanceNone')}
		>
			{getText($locale, 'provenance', 'toggle')}
		</div>
	{/if}
	<div
		class={classNames('ProvenanceFooter')}
	>
		<ExplainerToggle />
		<ProvenanceVerify />
	</div>
	<Explainer />
</div>
