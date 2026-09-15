<script lang="ts">
	import { classNames } from 'syw-common/helpers'
	import { getDateString } from 'syw-common/helpers/i18n'
	import type { ManifestGeneratorEntry, ManifestLocation } from 'syw-common/types/c2pa'
	import type { ManifestTableRowProps } from 'syw-common/types/components'
	import { getI18nContext } from '../store/i18n.js'
    import Map from './Map.svelte'
	import Actions from './Actions.svelte'
	import Generator from './Generator.svelte'
    import Tooltip from './Tooltip.svelte';
    import Icon from './Icon.svelte';

	const { locale, getText } = getI18nContext();

	const {
		type,
		manifest,
	}: ManifestTableRowProps = $props()

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

</script>

{#if formattedValue() !== null && formattedValue() !== undefined && formattedValue() !== ""}
	<li
		class={classNames('ManifestTableRow')}
	>
		<div
			class={classNames('ManifestTableRowLabel')}
		>
			<span>
				{type ? getText($locale, type, manifestType()) : ''}
			</span>
			<Tooltip
				content={getText($locale, type, manifestType(), "definition")}
			>
				<Icon
					type="info"
					className={classNames('ManifestTableRowLabelTooltipIcon')}
				/>
			</Tooltip>
		</div>
		<div
			class={classNames('ManifestTableRowValue')}
		>
			{#if type === 'location'}
				<Map
					location={value() as ManifestLocation}
				/>
			{:else if type === 'actions'}
				<Actions
					actions={value() as string[]}
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
		</div>
	</li>
{/if}
