import { classNames } from 'syw-common/helpers/ui'
import type { ManifestTableProps } from 'syw-common/types/components'
import { useI18nContext } from '$src/context'
import ManifestTableRow from './ManifestTableRow'
import ManifestSection from './ManifestSection'

function ManifestTable({ keys = [], manifest }: ManifestTableProps) {
	const { getText } = useI18nContext()
	return (
		<ManifestSection
			title={getText('section', 'table')}
			className={classNames('ManifestTable')}
		>
			<ul
				className={classNames('ManifestTableRows')}
			>
				{keys.map(key =>
					<ManifestTableRow
						key={key}
						type={key}
						manifest={manifest}
					/>
				)}
			</ul>
		</ManifestSection>
	)
}

export default ManifestTable