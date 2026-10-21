import ManifestTable from './ManifestTable'
import { classNames } from 'syw-common/helpers/ui'
import { MANIFEST_PRIMARY_KEYS } from 'syw-common/constants/ui'
import type { ManifestContentProps } from 'syw-common/types/components'
import ManifestTrust from './ManifestTrust'
import ManifestContentTabs from './ManifestContentTabs'
import ManifestContentTabsToggle from './ManifestContentTabsToggle'
import ManifestIdentity from './ManifestIdentity'

function ManifestContent({ tabKeys, manifest }: ManifestContentProps) {
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
						<ManifestTrust
							manifest={manifest}
						/>
						<ManifestIdentity
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
			: <ManifestTrust manifest={manifest} />}
		</div>
	)
}

export default ManifestContent