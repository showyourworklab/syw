<script lang="ts">
	import { classNames, getManifestTypeIcon } from 'syw-common/helpers/ui'
	import type { ManifestDetailGeneratorProps } from 'syw-common/types/components'
	import { getI18nContext } from '../../store/i18n.js'
	import { getDataContext } from '../../store/data.js'
	import ManifestDetail from './ManifestDetail.svelte'

	const { locale, getText } = getI18nContext()
	const { mediaType } = getDataContext()

	const { manifest }: ManifestDetailGeneratorProps = $props()

	const typeKey = $derived(manifest.type?.key ?? 'unknown')
</script>

{#if manifest.generator?.length}
	<ManifestDetail
		title={getText($locale, 'generator', typeKey)}
		titleIcon={getManifestTypeIcon(typeKey)}
		titleTooltip={getText($locale, 'generator', typeKey, 'definition', $mediaType)}
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
	</ManifestDetail>
{/if}
