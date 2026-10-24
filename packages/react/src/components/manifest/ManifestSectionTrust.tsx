import type { ManifestSectionTrustProps } from 'syw-common/types/components'
import { classNames } from 'syw-common/helpers/ui'
import { useI18nContext } from '$src/context'
import Detail from '../shared/Detail'
import ManifestSection from './ManifestSection'

function ManifestSectionTrust({
	manifest
}: ManifestSectionTrustProps) {
	const { getText } = useI18nContext()

	const typeKey = manifest.type?.key ?? 'unknown'

	return (
		<ManifestSection
			title={getText('section', 'trust')}
			definition={getText('section', 'trust', 'definition')}
			className={classNames('ManifestSectionTrust')}
		>
			{manifest.signator ?
				<Detail
					title={getText('signator', typeKey)}
					titleTooltip={getText('signator', typeKey, 'definition')}
					className={classNames('ManifestSectionTrustSignator')}
				>
					{manifest.signator}
				</Detail>
			: null}
			<Detail
				title={getText('trust', manifest.trust.value)}
				titleIcon={manifest.trust.value}
				footer={getText('trust', manifest.trust.value, 'definition')}
				className={classNames(
					'ManifestSectionTrustDetail',
					`ManifestSectionTrustDetail_${manifest.trust.value}`,
				)}
			/>
		</ManifestSection>
	)
}

export default ManifestSectionTrust
