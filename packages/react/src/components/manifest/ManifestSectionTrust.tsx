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

	return (
		<ManifestSection
			title={getText('section', 'trust')}
			titleIcon="section_trust"
			definition={getText('section', 'trust', 'definition', mediaType)}
			className={classNames('ManifestSectionTrust')}
		>
			<ManifestDetail
				title={getText('trust', manifest.trust.value)}
				titleIcon={manifest.trust.value}
				titleTooltip={getText('trust', 'definition')}
				footer={getText('trust', manifest.trust.value, 'definition')}
				className={classNames(
					'ManifestSectionTrustDetail',
					`ManifestSectionTrustDetail_${manifest.trust.value}`,
				)}
			/>
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
