import type { ManifestSectionIdentityProps } from 'syw-common/types/components'
import { classNames } from 'syw-common/helpers/ui'
import { useI18nContext } from '$src/context'
import ManifestSection from '$src/components/manifest/ManifestSection'
import ManifestDetail from '$src/components/manifest/ManifestDetail'

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
					titleTooltip={getText('identity', 'name', 'definition')}
					className={classNames('ManifestSectionIdentityName')}
				>
					{manifest.identity.name}
				</ManifestDetail>
			</ManifestSection>
		: null
	)
}

export default ManifestSectionIdentity
