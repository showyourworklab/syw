<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import { getDateString } from 'syw-common/helpers/i18n'
	import type { ManifestGeneratorEntry } from 'syw-common/types/data'
	import type { ManifestSectionPrimaryDetailProps } from 'syw-common/types/components'
	import { getI18nContext } from '../../store/i18n.js'
	import ManifestGenerator from './ManifestGenerator.svelte'
	import Detail from '../shared/Detail.svelte'

	const { locale, getText } = getI18nContext();

	const {
		type,
		manifest,
	}: ManifestSectionPrimaryDetailProps = $props()

	const value = $derived(() =>
		manifest[type]
	)

	const manifestType = $derived(() =>
		String(manifest?.type?.key)
	)

	const formattedValue = $derived(() => {
		switch(type) {
			case 'producer':
				return (value() as { name?: string | null }[] | undefined)?.map(v => v.name).join(', ')
			case 'timestamp':
				return getDateString($locale, value() as { date?: Date, offset?: string | null } | undefined)
			default:
				return value()
		}
	})

	const isEmpty = $derived(() => {
		const v = formattedValue()
		return v === null || v === undefined || v === "" || (Array.isArray(v) && !v.length)
	})

</script>

{#if !isEmpty()}
	<Detail
		title={type ? getText($locale, type, manifestType()) : ''}
		titleTooltip={getText($locale, type, manifestType(), "definition")}
		className={classNames('ManifestSectionPrimaryDetail')}
	>
		{#if type === 'generator'}
			{#each value() as ManifestGeneratorEntry[] as v}
				<ManifestGenerator
					name={v.name}
					icon={v.icon}
				/>
			{/each}
		{:else}
			{formattedValue()}
		{/if}
	</Detail>
{/if}
