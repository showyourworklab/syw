import type { ManifestSectionIdentityProps } from 'syw-common/types/components'
import { classNames } from 'syw-common/helpers/ui'
import { useI18nContext } from '$src/context'
import ManifestSection from './ManifestSection'
import ManifestDetail from './ManifestDetail'

function ManifestSectionIdentity({ manifest }: ManifestSectionIdentityProps) {
	const { getText } = useI18nContext()

	return (
		manifest.identity ?
			<ManifestSection
				title={getText('section', 'identity')}
				titleIcon="section_identity"
				className={classNames('ManifestSectionIdentity')}
			>
				<ManifestDetail
					title={getText('identity', 'name')}
					titleIcon="identity"
					className={classNames('ManifestSectionIdentityName')}
				>
					{manifest.identity.name}
				</ManifestDetail>
			</ManifestSection>
		: null
	)
}

export default ManifestSectionIdentity
