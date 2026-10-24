<script lang="ts">
	import { classNames, getManifestDetailIcon } from 'syw-common/helpers/ui'
	import { getDateString } from 'syw-common/helpers/i18n'
	import type { ManifestDetailPrimaryProps } from 'syw-common/types/components'
	import { getI18nContext } from '$lib/store/i18n.js'
	import ManifestDetail from './ManifestDetail.svelte'

	const { locale, getText } = getI18nContext();

	const {
		type,
		manifest,
	}: ManifestDetailPrimaryProps = $props()

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
	<ManifestDetail
		title={type ? getText($locale, type, manifestType()) : ''}
		titleIcon={getManifestDetailIcon(type)}
		titleTooltip={getText($locale, type, manifestType(), "definition")}
		className={classNames('ManifestDetailPrimary')}
	>
		{formattedValue()}
	</ManifestDetail>
{/if}
