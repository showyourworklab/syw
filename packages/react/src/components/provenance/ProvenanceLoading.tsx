import { useI18nContext } from '$src/context/i18n'
import { classNames } from 'syw-common/helpers/ui'
import Loader from '$src/components/shared/Loader'

const ProvenanceLoading = () => {
	const { getText } = useI18nContext()

	return (
		<div
			className={classNames('ProvenanceLoading')}
		>
			<Loader
				loading={true}
				className={classNames('ProvenanceLoadingLoader')}
			/>
			<span>
				{getText('provenance', 'loading')}
			</span>
		</div>
	)
}

export default ProvenanceLoading
