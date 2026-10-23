import { classNames } from 'syw-common/helpers/ui'
import type { ManifestContentProps } from 'syw-common/types/components'
import { useDataContext } from '$src/context'
import ManifestContentTabs from './ManifestContentTabs'
import ManifestContentTabsToggle from './ManifestContentTabsToggle'

function ManifestContent({ tabKeys, manifest }: ManifestContentProps) {
	const { mediaType } = useDataContext()

	return (
		<div
			className={classNames('ManifestContent')}
		>
			{manifest?.type?.key !== "unknown_create" ?
				<div
					className={classNames('ManifestContentInner')}
				>
					<ManifestContentTabsToggle
						keys={tabKeys}
						manifest={manifest}
						className={classNames('ManifestContentInnerTabsToggle')}
					/>
					<ManifestContentTabs
						keys={tabKeys}
						manifest={manifest}
					/>
				</div>
			: `There is no verifiable origin for this ${mediaType}`}
		</div>
	)
}

export default ManifestContent
