<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import Collapse from './Collapse.svelte'
    import Icon from './Icon.svelte';
	import Markdown from './Markdown.svelte'
	import { getI18nContext } from '$lib/store/i18n.js'
	import { getUiContext } from '$lib/store/ui.js'

	const { locale, getText } = getI18nContext();
	const { isExplainerOpen, closeExplainer } = getUiContext();

	const onCloseClick = closeExplainer

</script>

<div
	class={classNames('Explainer')}
>
	<Collapse
		open={$isExplainerOpen}
	>
		<div
			class={classNames('ExplainerInner')}
		>
			<div
				class={classNames('ExplainerBox')}
			>
				<div
					class={classNames('ExplainerHeader')}
				>
					<button
						class={classNames('ExplainerClose')}
						aria-pressed={$isExplainerOpen}
						aria-label={getText($locale, 'explainer', 'toggle', 'close')}
						onclick={onCloseClick}
					>
						<Icon
							type="close"
						/>
					</button>
					<p
						class={classNames('ExplainerLede')}
					>
						{getText($locale, 'explainer', 'lede')}
					</p>
				</div>
				<dl
					class={classNames('ExplainerSections')}
				>
					{#each [1, 2] as index}
						<div
							class={classNames('ExplainerSection')}
						>
							<dt
								class={classNames('ExplainerSectionTitle')}
							>
								{getText($locale, 'explainer', 'section', index, 'title')}
							</dt>
							<Markdown
								tag="dd"
								class={classNames('ExplainerSectionBody')}
								content={getText($locale, 'explainer', 'section', index, 'body')}
							/>
						</div>
					{/each}
				</dl>
			</div>
		</div>
	</Collapse>
</div>
