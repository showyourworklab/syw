import { useMemo } from 'react'
import { classNames } from 'syw-common/helpers/ui'
import { getDateString } from 'syw-common/helpers/i18n'
import type { ManifestGeneratorEntry, ManifestTimestamp } from 'syw-common/types/data'
import type { ManifestTableDetailProps } from 'syw-common/types/components'
import { useI18nContext } from '$src/context/i18n'
import Generator from './Generator'
import Detail from './Detail'

function ManifestTableDetail({ type, manifest }: ManifestTableDetailProps) {
	const { locale, getText } = useI18nContext()

	const value = useMemo(() =>
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
			className={classNames('ManifestTableDetail')}
		>
			{type === 'generator' ?
				(value as ManifestGeneratorEntry[]).map((v, index) =>
					<Generator
						key={index}
						name={v.name}
						icon={v.icon}
					/>
				)
			: formattedValue as string}
		</Detail>
	)
}

export default ManifestTableDetail