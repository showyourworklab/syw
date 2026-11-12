<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import type { ManifestDetailGeneratorProps } from 'syw-common/types/components'
	import { getI18nContext } from '$lib/store/i18n.js'
	import ManifestDetail from '$lib/components/manifest/ManifestDetail.svelte'

	const { locale, getText } = getI18nContext()

	const { manifest }: ManifestDetailGeneratorProps = $props()

	const typeKey = $derived(manifest.type?.key ?? 'unknown')
</script>

{#if manifest.generator}
	<ManifestDetail
		title={getText($locale, 'generator', typeKey)}
		titleIcon={typeKey}
		trust={manifest.generator.trust}
		className={classNames('ManifestDetailGenerator')}
	>
		{#snippet value()}
			{#each manifest.generator?.value ?? [] as entry}
				<span
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
				</span>
			{/each}
		{/snippet}
	</ManifestDetail>
{/if}
