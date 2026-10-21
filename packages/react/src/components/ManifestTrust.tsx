import type { ManifestTrustProps } from 'syw-common/types/components'
import { TRUST_KEYS } from 'syw-common/constants/data'
import { classNames } from 'syw-common/helpers/ui'
import { useI18nContext } from '$src/context'
import Detail from './Detail'
import ManifestSection from './ManifestSection'

function ManifestTrust({
	manifest
}: ManifestTrustProps) {
	const { getText } = useI18nContext()

	const isNotTrusted = manifest.trust.value !== TRUST_KEYS.TRUSTED

	return (
		<ManifestSection
			title={getText('section', 'trust')}
			className={classNames('ManifestTrust')}
		>
			<Detail
				title={getText('trust', manifest.trust.value)}
				titleIcon={manifest.trust.value}
				footer={getText('trust', manifest.trust.value, 'definition')}
				hasBackground
				className={classNames(
					'ManifestTrustDetail',
					`ManifestTrustDetail_${manifest.trust.value}`,
				)}
			/>
		</ManifestSection>
	)
}

export default ManifestTrust
