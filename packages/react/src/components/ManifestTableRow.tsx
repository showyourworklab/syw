import { useMemo } from 'react'
import { classNames } from 'syw-common/helpers'
import { getDateString } from 'syw-common/helpers/i18n'
import type { ManifestGeneratorEntry, ManifestTimestamp } from 'syw-common/types/c2pa'
import type { ManifestTableRowProps } from 'syw-common/types/components'
import { useI18nContext } from '$src/context/i18n'
import Generator from './Generator'
import Tooltip from './Tooltip'
import Icon from './Icon'

function ManifestTableRow({ type, manifest }: ManifestTableRowProps) {
	const { locale, getText } = useI18nContext()

	const value = useMemo(() =>
		manifest[type]
	, [manifest, type]);

	const manifestType = useMemo(() =>
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

	if(formattedValue === null || formattedValue === undefined || formattedValue === "") return

	return (
		<li
			className={classNames('ManifestTableRow')}
		>
			<div
				className={classNames('ManifestTableRowLabel')}
			>
				<span>
					{getText(type, manifestType)}
				</span>
				<Tooltip
					content={getText(type, manifestType, "definition")}
				>
					<Icon
						type="info"
						className={classNames('ManifestTableRowLabelTooltipIcon')}
					/>
				</Tooltip>
			</div>
			<div
				className={classNames('ManifestTableRowValue')}
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
			</div>
		</li>
	)
}

export default ManifestTableRow