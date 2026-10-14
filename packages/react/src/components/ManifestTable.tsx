import { classNames } from 'syw-common/helpers/ui'
import type { ManifestTableProps } from 'syw-common/types/components'
import ManifestTableRow from './ManifestTableRow'

function ManifestTable({ keys = [], manifest }: ManifestTableProps) {
	return (
		<ul
			className={classNames('ManifestTable')}
		>
			{keys.map(key =>
				<ManifestTableRow
					key={key}
					type={key}
					manifest={manifest}
				/>
			)}
		</ul>
	)
}

export default ManifestTable