import type { TrustProps } from 'syw-common/types/components'
import { TRUST_KEYS } from 'syw-common/constants/data'
import { classNames } from 'syw-common/helpers/ui'
import { useI18nContext } from '$src/context'
// import Tooltip from './Tooltip'
import Icon from './Icon'

function Trust({
	manifest
}: TrustProps) {
	const { getText } = useI18nContext()

	const isNotTrusted = manifest.trust.value !== TRUST_KEYS.TRUSTED

	return (
		isNotTrusted ?
			<div
				className={classNames(
					'Trust',
					`Trust_${manifest.trust.value}`,
				)}
				
			>
				<div
					className={classNames('TrustLabel')}
				>
					<Icon
						type={manifest.trust.value}
						className={classNames('TrustIcon')}
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
						className={classNames('TrustLabelTooltipIcon')}
					/>
				</Tooltip> */}
				<p
					className={classNames('TrustDefinition')}
				>
					{getText('trust', manifest.trust.value, 'definition')}
				</p>
			</div>
		: null
	)
}

export default Trust
