import { classNames } from 'syw-common/helpers/ui'
import { MANIFEST_EMPTY_TYPE_KEYS } from 'syw-common/constants/ui'
import type { ManifestContentProps } from 'syw-common/types/components'
import ManifestEmpty from '$src/components/manifest/ManifestEmpty'
import ManifestContentTabs from '$src/components/manifest/ManifestContentTabs'
import ManifestContentTabsToggle from '$src/components/manifest/ManifestContentTabsToggle'

function ManifestContent({ tabKeys, manifest }: ManifestContentProps) {
	return (
		<div
			className={classNames('ManifestContent')}
		>
			{!(manifest.type && MANIFEST_EMPTY_TYPE_KEYS.includes(manifest.type.key)) ?
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
			: <ManifestEmpty
				manifest={manifest}
			/>}
		</div>
	)
}

export default ManifestContent
