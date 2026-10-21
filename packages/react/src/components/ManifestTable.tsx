import { classNames } from 'syw-common/helpers/ui'
import type { ManifestTableProps } from 'syw-common/types/components'
import { useI18nContext } from '$src/context'
import ManifestTableDetail from './ManifestTableDetail'
import ManifestSection from './ManifestSection'

function ManifestTable({ keys = [], manifest }: ManifestTableProps) {
	const { getText } = useI18nContext()
	return (
		<ManifestSection
			title={getText('section', 'table')}
			className={classNames('ManifestTable')}
		>
			<div
				className={classNames('ManifestTableDetails')}
			>
				{keys.map(key =>
					<ManifestTableDetail
						key={key}
						type={key}
						manifest={manifest}
					/>
				)}
			</div>
		</ManifestSection>
	)
}

export default ManifestTable