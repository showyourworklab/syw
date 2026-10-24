import { classNames } from 'syw-common/helpers/ui'
import { MANIFEST_PRIMARY_KEYS } from 'syw-common/constants/ui'
import type { ManifestInfoProps } from 'syw-common/types/components'
import ManifestSectionIdentity from './ManifestSectionIdentity'
import ManifestSectionPrimary from './ManifestSectionPrimary'
import ManifestSectionTrust from './ManifestSectionTrust'

function ManifestInfo({ manifest, className }: ManifestInfoProps) {
	return (
		<div
			className={classNames('ManifestInfo', className)}
		>
			<div
				className={classNames('ManifestInfoColumn')}
			>
				<ManifestSectionIdentity
					manifest={manifest}
				/>
				<ManifestSectionPrimary
					keys={MANIFEST_PRIMARY_KEYS}
					manifest={manifest}
				/>
			</div>
			<div
				className={classNames('ManifestInfoColumn')}
			>
				<ManifestSectionTrust
					manifest={manifest}
				/>
			</div>
		</div>
	)
}

export default ManifestInfo
