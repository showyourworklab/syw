<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import { getDateString } from 'syw-common/helpers/i18n'
	import type { ManifestActions, ManifestGeneratorEntry, ManifestLocation } from 'syw-common/types/data'
	import type { ManifestTableDetailProps } from 'syw-common/types/components'
	import { getI18nContext } from '../store/i18n.js'
    import Map from './Map.svelte'
	import Actions from './Actions.svelte'
	import Generator from './Generator.svelte'
	import Detail from './Detail.svelte'

	const { locale, getText } = getI18nContext();

	const {
		type,
		manifest,
	}: ManifestTableDetailProps = $props()

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
		className={classNames('ManifestTableDetail')}
	>
		{#if type === 'location'}
			<Map
				location={value() as ManifestLocation}
			/>
		{:else if type === 'actions'}
			<Actions
				actions={value() as ManifestActions}
			/>
		{:else if type === 'generator'}
			{#each value() as ManifestGeneratorEntry[] as v}
				<Generator
					name={v.name}
					icon={v.icon}
				/>
			{/each}
		{:else}
			{formattedValue()}
		{/if}
	</Detail>
{/if}
