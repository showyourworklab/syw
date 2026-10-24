import { useMemo } from 'react'
import { classNames, getManifestDetailIcon } from 'syw-common/helpers/ui'
import { getDateString } from 'syw-common/helpers/i18n'
import type { ManifestTimestamp } from 'syw-common/types/data'
import type { ManifestDetailPrimaryProps } from 'syw-common/types/components'
import { useI18nContext } from '$src/context/i18n'
import ManifestDetail from './ManifestDetail'

function ManifestDetailPrimary({ type, manifest }: ManifestDetailPrimaryProps) {
	const { locale, getText } = useI18nContext()

	const value: any = useMemo(() =>
		manifest[type]
	, [manifest, type]);

	const manifestTypeTextKey = useMemo(() =>
		String(manifest?.type?.key)
	, [manifest]);

	const formattedValue = useMemo(() => {
		switch(type) {
			case 'producer':
				return (value as { name?: string }[] | undefined)?.map(v => v.name).join(', ')
			case 'timestamp':
				return getDateString(locale ?? '', (value as ManifestTimestamp | null) ?? undefined)
			default:
				return value
		}
	}, [type, value, locale]);

	if(formattedValue === null || formattedValue === undefined || formattedValue === "" || (Array.isArray(formattedValue) && !formattedValue.length)) return

	return (
		<ManifestDetail
			title={getText(type, manifestTypeTextKey)}
			titleIcon={getManifestDetailIcon(type)}
			titleTooltip={getText(type, manifestTypeTextKey, "definition")}
			className={classNames('ManifestDetailPrimary')}
		>
			{formattedValue as string}
		</ManifestDetail>
	)
}

export default ManifestDetailPrimary