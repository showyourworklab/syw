import { classNames } from 'syw-common/helpers/ui'
import { MANIFEST_LOCATION_TYPES, MANIFEST_ACTIONS_TYPES } from 'syw-common/constants/ui'
import type { ManifestSectionPrimaryProps } from 'syw-common/types/components'
import { useI18nContext } from '$src/context'
import ManifestDetailPrimary from '$src/components/manifest/ManifestDetailPrimary'
import ManifestDetailGenerator from '$src/components/manifest/ManifestDetailGenerator'
import ManifestDetailLocation from '$src/components/manifest/ManifestDetailLocation'
import ManifestDetailActions from '$src/components/manifest/ManifestDetailActions'
import ManifestSection from '$src/components/manifest/ManifestSection'

function ManifestSectionPrimary({ keys = [], manifest }: ManifestSectionPrimaryProps) {
	const { getText } = useI18nContext()
	const typeKey = manifest.type?.key ?? 'unknown'
	const showLocation = MANIFEST_LOCATION_TYPES.includes(typeKey)
	const showActions = MANIFEST_ACTIONS_TYPES.includes(typeKey)

	return (
		<ManifestSection
			title={getText('section', 'primary', manifest.type?.key ?? 'unknown')}
			titleIcon="section_primary"
			className={classNames('ManifestSectionPrimary')}
		>
			<div
				className={classNames('ManifestSectionPrimaryDetails')}
			>
				{keys.map(key =>
					key === 'generator' ?
						<ManifestDetailGenerator
							key={key}
							manifest={manifest}
						/>
					:
						<ManifestDetailPrimary
							key={key}
							type={key}
							manifest={manifest}
						/>
				)}
				{showLocation ?
					<ManifestDetailLocation
						manifest={manifest}
					/>
				: null}
				{showActions ?
					<ManifestDetailActions
						manifest={manifest}
					/>
				: null}
			</div>
		</ManifestSection>
	)
}

export default ManifestSectionPrimary