import type { ManifestTrustProps } from 'syw-common/types/components'
import { classNames } from 'syw-common/helpers/ui'
import { useI18nContext } from '$src/context'
import Detail from './Detail'
import ManifestSection from './ManifestSection'

function ManifestTrust({
	manifest
}: ManifestTrustProps) {
	const { getText } = useI18nContext()

	const typeKey = manifest.type?.key ?? 'unknown'

	return (
		<ManifestSection
			title={getText('section', 'trust')}
			definition={getText('section', 'trust', 'definition')}
			className={classNames('ManifestTrust')}
		>
			{manifest.signator ?
				<Detail
					title={getText('signator', typeKey)}
					titleTooltip={getText('signator', typeKey, 'definition')}
					className={classNames('ManifestTrustSignator')}
				>
					{manifest.signator}
				</Detail>
			: null}
			<Detail
				title={getText('trust', manifest.trust.value)}
				titleIcon={manifest.trust.value}
				footer={getText('trust', manifest.trust.value, 'definition')}
				className={classNames(
					'ManifestTrustDetail',
					`ManifestTrustDetail_${manifest.trust.value}`,
				)}
			/>
		</ManifestSection>
	)
}

export default ManifestTrust
