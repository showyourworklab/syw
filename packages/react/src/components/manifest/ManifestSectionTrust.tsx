import type { ManifestSectionTrustProps } from 'syw-common/types/components'
import { classNames } from 'syw-common/helpers/ui'
import { useI18nContext, useDataContext } from '$src/context'
import ManifestDetail from '$src/components/manifest/ManifestDetail'
import ManifestSection from '$src/components/manifest/ManifestSection'

function ManifestSectionTrust({
	manifest
}: ManifestSectionTrustProps) {
	const { getText } = useI18nContext()
	const { mediaType } = useDataContext()

	const typeKey = manifest.type?.key ?? 'unknown'
	const signer = manifest.validation?.signer

	return (
		<ManifestSection
			title={getText('section', 'trust')}
			titleIcon="section_trust"
			definition={getText('section', 'trust', 'definition', mediaType)}
			className={classNames('ManifestSectionTrust')}
		>
			{signer ?
				<ManifestDetail
					title={getText('trust', signer)}
					titleIcon={signer}
					titleTooltip={getText('trust', 'definition')}
					footer={getText('trust', signer, 'definition')}
					className={classNames(
						'ManifestSectionTrustDetail',
						`ManifestSectionTrustDetail_${signer}`,
					)}
				/>
			: null}
			{manifest.signator ?
				<ManifestDetail
					title={getText('signator', typeKey)}
					titleIcon="signator"
					titleTooltip={getText('signator', typeKey, 'definition', mediaType)}
					className={classNames('ManifestSectionTrustSignator')}
				>
					{manifest.signator}
				</ManifestDetail>
			: null}
		</ManifestSection>
	)
}

export default ManifestSectionTrust
