import { classNames } from 'syw-common/helpers/ui'
import type { ManifestDetailGeneratorProps } from 'syw-common/types/components'
import { useI18nContext } from '$src/context'
import Detail from '../shared/Detail'

function ManifestDetailGenerator({ manifest }: ManifestDetailGeneratorProps) {
	const { getText } = useI18nContext()

	if(!manifest.generator?.length) return null

	const typeKey = manifest.type?.key ?? 'unknown'

	return (
		<Detail
			title={getText('generator', typeKey)}
			titleTooltip={getText('generator', typeKey, 'definition')}
			className={classNames('ManifestDetailGenerator')}
		>
			{manifest.generator.map((entry, index) =>
				<div
					key={index}
					className={classNames('ManifestDetailGeneratorEntry')}
				>
					{entry.icon ?
						<img
							alt=""
							src={entry.icon}
							className={classNames('ManifestDetailGeneratorIcon')}
						/>
					: null}
					<span>
						{entry.name}
					</span>
				</div>
			)}
		</Detail>
	)
}

export default ManifestDetailGenerator
