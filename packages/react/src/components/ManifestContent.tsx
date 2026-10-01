import ManifestTable from './ManifestTable'
import { classNames } from 'syw-common/helpers'
import { MANIFEST_PRIMARY_KEYS } from 'syw-common/constants'
import type { ManifestContentProps } from 'syw-common/types/components'
import ManifestIdentity from './ManifestIdentity'
import ManifestContentTabs from './ManifestContentTabs'
import ManifestContentTabsToggle from './ManifestContentTabsToggle'

function ManifestContent({ tabKeys, manifest }: ManifestContentProps) {
	return (
		<div
			className={classNames('ManifestContent')}
		>
			<div
				className={classNames('ManifestContentPrimary')}
			>
				<ManifestIdentity
					manifest={manifest}
				/>
				<ManifestTable
					keys={MANIFEST_PRIMARY_KEYS}
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
	)
}

export default ManifestContent