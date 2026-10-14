import { classNames } from 'syw-common/helpers/ui'
import { getVerifyUrl } from 'syw-common/helpers/data'
import { VERIFY_BASE_URL } from 'syw-common/constants/ui'
import { useDataContext, useI18nContext } from '$src/context'

const ProvenanceVerify = () => {
	const { getText } = useI18nContext()
	const { src } = useDataContext()

	const verifyUrl = getVerifyUrl(src ?? '')

	return (
		<div
			className={classNames('ProvenanceVerify')}
		>
			{getText('verify', 'pre')}&nbsp;
			<a
				href={verifyUrl}
				target='_blank'

			>
				{VERIFY_BASE_URL}
			</a>
		</div>
	)
}

export default ProvenanceVerify