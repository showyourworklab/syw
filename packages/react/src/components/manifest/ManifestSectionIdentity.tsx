import type { ManifestSectionIdentityProps } from 'syw-common/types/components'
import { classNames } from 'syw-common/helpers/ui'
import { useI18nContext, useDataContext } from '$src/context'
import ManifestSection from '$src/components/manifest/ManifestSection'
import ManifestDetail from '$src/components/manifest/ManifestDetail'
import Chip from '$src/components/shared/Chip'

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
					>
						{identity.accounts.length ?
							<div
								className={classNames('ManifestSectionIdentityAccounts')}
							>
								{identity.accounts.map((account, index) =>
									<Chip
										key={index}
										href={account.uri}
										overline={account.provider}
										icon={account.uri ? "external" : null}
										className={classNames('ManifestSectionIdentityAccount')}
									>
										{account.username}
									</Chip>
								)}
							</div>
						: null}
					</ManifestDetail>
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
