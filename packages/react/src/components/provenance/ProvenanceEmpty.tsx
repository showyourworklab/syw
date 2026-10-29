import { useI18nContext } from '$src/context/i18n'
import { classNames } from 'syw-common/helpers/ui'

const ProvenanceEmpty = () => {
	const { getText } = useI18nContext()

	return (
		<div
			className={classNames('ProvenanceEmpty')}
		>
			<span>
				{getText('provenance', 'empty')}
			</span>
		</div>
	)
}

export default ProvenanceEmpty
