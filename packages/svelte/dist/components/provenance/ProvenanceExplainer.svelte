<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import Collapse from '../shared/Collapse.svelte'
    import Icon from '../shared/Icon.svelte';
	import Markdown from '../shared/Markdown.svelte'
	import { getI18nContext } from '../../store/i18n.js'
	import { getUiContext } from '../../store/ui.js'

	const { locale, getText } = getI18nContext();
	const { isExplainerOpen, closeExplainer } = getUiContext();

	const onCloseClick = closeExplainer

</script>

<div
	class={classNames('ProvenanceExplainer')}
>
	<Collapse
		open={$isExplainerOpen}
	>
		<div
			class={classNames('ProvenanceExplainerInner')}
		>
			<div
				class={classNames('ProvenanceExplainerBox')}
			>
				<div
					class={classNames('ProvenanceExplainerHeader')}
				>
					<button
						class={classNames('ProvenanceExplainerClose')}
						aria-pressed={$isExplainerOpen}
						aria-label={getText($locale, 'explainer', 'toggle', 'close')}
						onclick={onCloseClick}
					>
						<Icon
							type="close"
						/>
					</button>
					<p
						class={classNames('ProvenanceExplainerLede')}
					>
						{getText($locale, 'explainer', 'lede')}
					</p>
				</div>
				<dl
					class={classNames('ProvenanceExplainerSections')}
				>
					{#each [1, 2] as index}
						<div
							class={classNames('ProvenanceExplainerSection')}
						>
							<dt
								class={classNames('ProvenanceExplainerSectionTitle')}
							>
								{getText($locale, 'explainer', 'section', index, 'title')}
							</dt>
							<Markdown
								tag="dd"
								class={classNames('ProvenanceExplainerSectionBody')}
								content={getText($locale, 'explainer', 'section', index, 'body')}
							/>
						</div>
					{/each}
				</dl>
			</div>
		</div>
	</Collapse>
</div>
