import { classNames } from 'syw-common/helpers/ui'
import { MANIFEST_PRIMARY_KEYS } from 'syw-common/constants/ui'
import type { ManifestInfoProps } from 'syw-common/types/components'
import ManifestIdentity from './ManifestIdentity'
import ManifestPrimary from './ManifestPrimary'
import ManifestTrust from './ManifestTrust'

function ManifestInfo({ manifest, className }: ManifestInfoProps) {
	return (
		<div
			className={classNames('ManifestInfo', className)}
		>
			<div
				className={classNames('ManifestInfoColumn')}
			>
				<ManifestIdentity
					manifest={manifest}
				/>
				<ManifestPrimary
					keys={MANIFEST_PRIMARY_KEYS}
					manifest={manifest}
				/>
			</div>
			<div
				className={classNames('ManifestInfoColumn')}
			>
				<ManifestTrust
					manifest={manifest}
				/>
			</div>
		</div>
	)
}

export default ManifestInfo
