import { useMemo } from 'react'
import { classNames, getManifestDetailIcon } from 'syw-common/helpers/ui'
import { getDateString } from 'syw-common/helpers/i18n'
import type { ManifestTimestamp } from 'syw-common/types/data'
import type { ManifestDetailPrimaryProps } from 'syw-common/types/components'
import { useI18nContext } from '$src/context/i18n'
import ManifestDetail from '$src/components/manifest/ManifestDetail'
import { useDataContext } from '$src/context'

function ManifestDetailPrimary({ type, manifest }: ManifestDetailPrimaryProps) {
	const { locale, getText } = useI18nContext()
	const { mediaType } = useDataContext()

	const value: any = useMemo(() =>
		manifest[type]
	, [manifest, type]);

	const manifestTypeTextKey = useMemo(() =>
		String(manifest?.type?.key)
	, [manifest]);

	const formattedValue = useMemo(() => {
		switch(type) {
			case 'timestamp':
				return getDateString(locale ?? '', (value as ManifestTimestamp | null)?.value)
			default:
				return value
		}
	}, [type, value, locale]);

	if(formattedValue === null || formattedValue === undefined || formattedValue === "" || (Array.isArray(formattedValue) && !formattedValue.length)) return

	return (
		<ManifestDetail
			title={getText(type, manifestTypeTextKey, mediaType)}
			titleIcon={getManifestDetailIcon(type)}
			definition={type === 'timestamp'
				? getText(type, mediaType, 'definition')
				: getText(type, manifestTypeTextKey, "definition", mediaType)}
			value={formattedValue as string}
			trust={value?.trust}
			className={classNames('ManifestDetailPrimary')}
		/>
	)
}

export default ManifestDetailPrimary