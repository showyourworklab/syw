import { useMemo } from 'react'
import { classNames } from 'syw-common/helpers/ui'
import { getDateString } from 'syw-common/helpers/i18n'
import type { ManifestTimestamp } from 'syw-common/types/data'
import type { ManifestDetailPrimaryProps } from 'syw-common/types/components'
import { useI18nContext } from '$src/context/i18n'
import Detail from '../shared/Detail'

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
		<Detail
			title={getText(type, manifestTypeTextKey)}
			titleTooltip={getText(type, manifestTypeTextKey, "definition")}
			className={classNames('ManifestDetailPrimary')}
		>
			{formattedValue as string}
		</Detail>
	)
}

export default ManifestDetailPrimary