import { useState } from 'react'
import type { ManifestSectionTrustProps } from 'syw-common/types/components'
import { classNames } from 'syw-common/helpers/ui'
import { useI18nContext, useDataContext } from '$src/context'
import ManifestDetail from '$src/components/manifest/ManifestDetail'
import ManifestDetailToggle from '$src/components/manifest/ManifestDetailToggle'
import ManifestSection from '$src/components/manifest/ManifestSection'
import Tooltip from '$src/components/shared/Tooltip'
import Icon from '../shared/Icon'

function ManifestSectionTrust({
	manifest
}: ManifestSectionTrustProps) {
	const { getText } = useI18nContext()
	const { mediaType } = useDataContext()
	const [infoOpen, setInfoOpen] = useState(false)

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
					title={getText('trust')}
					titleIcon={signer}
					titleTooltip={getText('trust', 'definition')}
					className={classNames(
						'ManifestSectionTrustDetail',
						`ManifestSectionTrustDetail_${signer}`,
					)}
				>
					<ManifestDetailToggle
						open={infoOpen}
						value={getText('trust', signer)}
						subtitle={getText('trust', 'info', infoOpen ? 'hide' : 'show')}
						onToggle={() => setInfoOpen(!infoOpen)}
					>
						<div
							className={classNames('ManifestSectionTrustInfo')}
						>
							{manifest.signator ?
								<div
									className={classNames('ManifestSectionTrustSignator')}
								>
									<Icon
										type='signator'
										className={classNames('ManifestSectionTrustSignatorIcon')}
									/>
									<span
										className={classNames('ManifestSectionTrustSignatorTitle')}
									>
										{getText('signator', typeKey)}	
									</span>
									<span
										className={classNames('ManifestSectionTrustSignatorValue')}
									>
										{manifest.signator}
									</span>
								</div>
							: null}
							<p
								className={classNames('ManifestSectionTrustDefinition')}
							>
								{getText('trust', signer, 'definition')}
							</p>
						</div>
					</ManifestDetailToggle>
				</ManifestDetail>
			: null}
		</ManifestSection>
	)
}

export default ManifestSectionTrust
