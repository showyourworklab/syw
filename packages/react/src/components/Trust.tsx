import type { TrustProps } from 'syw-common/types/components'
import { C2PA_TRUST_VALUES } from 'syw-common/constants/c2pa'
import { classNames } from 'syw-common/helpers'
import { useI18nContext } from '$src/context'

function Trust({
	manifest
}: TrustProps) {
	const { getText } = useI18nContext()

	const isNotTrusted = manifest.trust.value !== C2PA_TRUST_VALUES.TRUSTED

	return (
		isNotTrusted ?
			<div
				className={classNames(
					'Trust',
					`Trust_${manifest.trust.value}`,
				)}
				
			>
				<strong
					className={'TrustLabel'}
				>
					{getText('trust', manifest.trust.value)}
				</strong>
				<p
					className={'TrustDefinition'}
				>
					{getText('trust', manifest.trust.value, 'definition')}
				</p>
			</div>
		: null
	)
}

export default Trust
