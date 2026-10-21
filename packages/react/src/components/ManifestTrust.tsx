import type { ManifestTrustProps } from 'syw-common/types/components'
import { TRUST_KEYS } from 'syw-common/constants/data'
import { classNames } from 'syw-common/helpers/ui'
import { useI18nContext } from '$src/context'
// import Tooltip from './Tooltip'
import Icon from './Icon'
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
			{isNotTrusted ?
				<div
					className={classNames(
						'ManifestTrustFlag',
						`ManifestTrustFlag_${manifest.trust.value}`,
					)}	
				>
					<div
						className={classNames('ManifestTrustFlagLabel')}
					>
						<Icon
							type={manifest.trust.value}
							className={classNames('ManifestTrustFlagIcon')}
						/>
						<span>
							{getText('trust', manifest.trust.value)}
						</span>
					</div>
					{/* <Tooltip
						content={getText('trust', manifest.trust.value, 'definition')}
					>
						<Icon
							type="info"
							className={classNames('ManifestTrustLabelTooltipIcon')}
						/>
					</Tooltip> */}
					<p
						className={classNames('ManifestTrustFlagDefinition')}
					>
						{getText('trust', manifest.trust.value, 'definition')}
					</p>
				</div>
			: null}
		</ManifestSection>
	)
}

export default ManifestTrust
