import { classNames } from 'syw-common/helpers/ui'
import { MANIFEST_LOCATION_TYPES, MANIFEST_ACTIONS_TYPES } from 'syw-common/constants/ui'
import type { ManifestPrimaryProps } from 'syw-common/types/components'
import { useI18nContext } from '$src/context'
import ManifestPrimaryField from './ManifestPrimaryField'
import ManifestLocation from './ManifestLocation'
import ManifestActions from './ManifestActions'
import ManifestSection from './ManifestSection'

function ManifestPrimary({ keys = [], manifest }: ManifestPrimaryProps) {
	const { getText } = useI18nContext()
	const typeKey = manifest.type?.key ?? 'unknown'
	const showLocation = MANIFEST_LOCATION_TYPES.includes(typeKey)
	const showActions = MANIFEST_ACTIONS_TYPES.includes(typeKey)

	return (
		<ManifestSection
			title={getText('section', 'primary', manifest.type?.key ?? 'unknown')}
			className={classNames('ManifestPrimary')}
		>
			<div
				className={classNames('ManifestPrimaryFields')}
			>
				{keys.map(key =>
					<ManifestPrimaryField
						key={key}
						type={key}
						manifest={manifest}
					/>
				)}
				{showLocation ?
					<ManifestLocation
						manifest={manifest}
					/>
				: null}
				{showActions ?
					<ManifestActions
						manifest={manifest}
					/>
				: null}
			</div>
		</ManifestSection>
	)
}

export default ManifestPrimary