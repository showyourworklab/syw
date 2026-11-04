import { classNames } from 'syw-common/helpers/ui'
import type { ManifestDetailGeneratorProps } from 'syw-common/types/components'
import { useI18nContext, useDataContext } from '$src/context'
import ManifestDetail from '$src/components/manifest/ManifestDetail'

function ManifestDetailGenerator({ manifest }: ManifestDetailGeneratorProps) {
	const { getText } = useI18nContext()
	const { mediaType } = useDataContext()

	if(!manifest.generator?.length) return null

	const typeKey = manifest.type?.key ?? 'unknown'

	return (
		<ManifestDetail
			title={getText('generator', typeKey)}
			titleIcon={typeKey}
			definition={getText('generator', typeKey, 'definition', mediaType)}
			value={manifest.generator.map((entry, index) =>
				<span
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
				</span>
			)}
			className={classNames('ManifestDetailGenerator')}
		/>
	)
}

export default ManifestDetailGenerator
