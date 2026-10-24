<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import { getDataContext } from '../../store/data.js'
	import { getI18nContext } from '../../store/i18n.js'
	import { getUiContext } from '../../store/ui.js'

	import Manifest from '../manifest/Manifest.svelte'
    import ProvenanceExplainer from './ProvenanceExplainer.svelte';
    import ProvenanceExplainerToggle from './ProvenanceExplainerToggle.svelte';
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
			{getText($locale, 'provenance', 'missing')}
		</div>
	{/if}
	<div
		class={classNames('ProvenanceFooter')}
	>
		<ProvenanceExplainerToggle />
		<ProvenanceVerify />
	</div>
	<ProvenanceExplainer />
</div>
