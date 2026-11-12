import type { ManifestSectionIdentityProps } from 'syw-common/types/components'
import { classNames } from 'syw-common/helpers/ui'
import { useI18nContext, useDataContext } from '$src/context'
import ManifestSection from '$src/components/manifest/ManifestSection'
import ManifestDetail from '$src/components/manifest/ManifestDetail'

function ManifestSectionIdentity({ manifest }: ManifestSectionIdentityProps) {
	const { getText } = useI18nContext()
	const { mediaType } = useDataContext()

	const typeKey = manifest.type?.key ?? 'unknown'
	const { identity, producer } = manifest

	return (
		identity || producer ?
			<ManifestSection
				title={getText('section', 'identity')}
				titleIcon="section_identity"
				className={classNames('ManifestSectionIdentity')}
			>
				{identity ?
					<ManifestDetail
						title={getText('identity', 'name')}
						titleIcon="identity"
						value={identity.value}
						trust={identity.trust}
						className={classNames('ManifestSectionIdentityName')}
					/>
				: null}
				{producer ?
					<ManifestDetail
						title={getText('producer', typeKey, mediaType)}
						titleIcon="producer"
						value={producer.value.join(', ')}
						trust={producer.trust}
						className={classNames('ManifestSectionIdentityProducer')}
					/>
				: null}
			</ManifestSection>
		: null
	)
}

export default ManifestSectionIdentity
