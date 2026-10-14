<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import { getI18nContext } from '$lib/store/i18n.js'
	import { getUiContext } from '$lib/store/ui.js'
    import Icon from './Icon.svelte'

	const { locale, getText } = getI18nContext();
	const { variant, isExplainerOpen, openExplainer, closeExplainer, openProvenance } = getUiContext();

	const { class: className }: { class?: string } = $props()

	const handleClick = (event: MouseEvent) => {
		// Toggle explainer based on current state
		if($isExplainerOpen) {
			closeExplainer(event)
		} else {
			openExplainer(event)
		}
		// If modal, also open provenance modal to view explainer
		if($variant === "modal") {
			openProvenance(event)
		}
	}
</script>

<button
	aria-pressed={$isExplainerOpen}
	class={classNames('ExplainerToggle', className)}
	onclick={handleClick}
>
	<span>
		{getText($locale, 'explainer', 'toggle')}
	</span>
	<Icon
		type={$isExplainerOpen ? "up" : "down"}
	/>
</button>
