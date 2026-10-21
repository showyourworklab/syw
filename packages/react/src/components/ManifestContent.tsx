import ManifestTable from './ManifestTable'
import { classNames } from 'syw-common/helpers/ui'
import { MANIFEST_PRIMARY_KEYS } from 'syw-common/constants/ui'
import type { ManifestContentProps } from 'syw-common/types/components'
import { useDataContext } from '$src/context'
import ManifestTrust from './ManifestTrust'
import ManifestContentTabs from './ManifestContentTabs'
import ManifestContentTabsToggle from './ManifestContentTabsToggle'
import ManifestIdentity from './ManifestIdentity'

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
					<div
						className={classNames('ManifestContentPrimary')}
					>
						<ManifestTable
							keys={MANIFEST_PRIMARY_KEYS}
							manifest={manifest}
						/>
						<ManifestIdentity
							manifest={manifest}
						/>
						<ManifestTrust
							manifest={manifest}
						/>
					</div>
					<div
						className={classNames('ManifestContentSecondary')}
					>
						<ManifestContentTabsToggle
							keys={tabKeys}
							manifest={manifest}
							className={classNames('ManifestContentSecondaryTabsToggle')}
						/>
						<ManifestContentTabs
							keys={tabKeys}
							manifest={manifest}
						/>
					</div>
				</div>
			: `There is no verifiable origin for this ${mediaType}`}
		</div>
	)
}

export default ManifestContent