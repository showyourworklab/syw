<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import type { ManifestDetailGeneratorProps } from 'syw-common/types/components'
	import { getI18nContext } from '$lib/store/i18n.js'
	import Detail from '../shared/Detail.svelte'

	const { locale, getText } = getI18nContext()

	const { manifest }: ManifestDetailGeneratorProps = $props()

	const typeKey = $derived(manifest.type?.key ?? 'unknown')
</script>

{#if manifest.generator?.length}
	<Detail
		title={getText($locale, 'generator', typeKey)}
		titleTooltip={getText($locale, 'generator', typeKey, 'definition')}
		className={classNames('ManifestDetailGenerator')}
	>
		{#each manifest.generator as entry}
			<div
				class={classNames('ManifestDetailGeneratorEntry')}
			>
				{#if entry.icon}
					<img
						alt=""
						src={entry.icon}
						class={classNames('ManifestDetailGeneratorIcon')}
					/>
				{/if}
				<span>
					{entry.name}
				</span>
			</div>
		{/each}
	</Detail>
{/if}
