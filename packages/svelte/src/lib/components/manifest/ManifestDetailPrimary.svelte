<script lang="ts">
	import { classNames, getManifestDetailIcon } from 'syw-common/helpers/ui'
	import { getDateString } from 'syw-common/helpers/i18n'
	import type { ManifestTimestamp } from 'syw-common/types/data'
	import type { ManifestDetailPrimaryProps } from 'syw-common/types/components'
	import { getI18nContext } from '$lib/store/i18n.js'
	import { getDataContext } from '$lib/store/data.js'
	import ManifestDetail from '$lib/components/manifest/ManifestDetail.svelte'

	const { locale, getText } = getI18nContext();
	const { mediaType } = getDataContext()

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
			case 'timestamp':
				return getDateString($locale, (value() as ManifestTimestamp | null)?.value)
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
		title={type ? getText($locale, type, manifestType(), $mediaType) : ''}
		titleIcon={getManifestDetailIcon(type)}
		definition={type === 'timestamp'
			? getText($locale, type, $mediaType, 'definition')
			: getText($locale, type, manifestType(), "definition", $mediaType)}
		value={formattedValue() as string}
		trust={(value() as ManifestTimestamp | null)?.trust}
		className={classNames('ManifestDetailPrimary')}
	/>
{/if}
