<script lang="ts">
	import { classNames, handleA11yClick } from 'syw-common/helpers/ui'
	import { getDateString } from 'syw-common/helpers/i18n'
	import { MANIFEST_PREVIEW_TITLE_KEYS } from 'syw-common/constants/ui'
	import type { ManifestPreviewProps } from 'syw-common/types/components'
	import { getI18nContext } from '$lib/store/i18n.js'
	import { getUiContext } from '$lib/store/ui.js'
    import Badge from './Badge.svelte';
    import Icon from './Icon.svelte';
    import ManifestContentTabsToggle from './ManifestContentTabsToggle.svelte';

	const {
		open,
		manifest,
		tabKeys,
		previewRef,
	}: Pick<ManifestPreviewProps, 'open' | 'manifest' | 'tabKeys'> & {
		previewRef?: ((el: HTMLElement | null) => void) | null
	} = $props()

	let toggleEl: HTMLElement | null = $state(null)

	$effect(() => {
		if(previewRef) previewRef(toggleEl)
	})

	const { locale, getText } = getI18nContext();
	const {
		openManifest, closeManifest
	} = getUiContext();

	const handleClick = ((event: unknown) => {
		if(open) {
			closeManifest(event, manifest)
		} else {
			openManifest(event, manifest)
		}
	})

	const handleKeyDown = (event: KeyboardEvent) => {
		handleA11yClick(event, handleClick)
	}

</script>

<div
	class={classNames('ManifestPreview')}
>
	<div
		bind:this={toggleEl}
		role='button'
		tabindex={0}
		aria-pressed={open}
		class={classNames('ManifestPreviewToggle')}
		onclick={handleClick}
		onkeydown={handleKeyDown}
	>
		<div
			class={classNames('ManifestPreviewBadge')}
		>
			<Badge
				type={manifest.type}
			/>
		</div>
		<div
			class={classNames('ManifestPreviewCells')}
		>
			<div
				class={classNames(
					'ManifestPreviewCell',
					'ManifestPreviewCell_issuer'
				)}
			>
				{manifest.type?.key
					? getText($locale, 'type', manifest.type?.key)
					: MANIFEST_PREVIEW_TITLE_KEYS.filter(key => manifest[key]).map(key =>
						manifest[key]
					).join(" ")}
			</div>
			<div
				class={classNames(
					'ManifestPreviewCell',
					'ManifestPreviewCell_time'
				)}
			>
				<span>{getDateString($locale, manifest?.timestamp ?? undefined) ?? ''}</span>
			</div>
			<div
				class={classNames(
					'ManifestPreviewCell',
					'ManifestPreviewCell_thumb'
				)}
			>
				{#if manifest?.thumbnail}
					<img
						src={manifest?.thumbnail}
						alt=''
					/>
				{:else}
					<Icon
						type="missing"
					/>
				{/if}
			</div>
		</div>
	</div>
	<ManifestContentTabsToggle
		keys={tabKeys}
		manifest={manifest}
		class={classNames('ManifestPreviewTabsToggle')}
	/>
</div>
