import { PHASE_KEYS } from 'syw-common/constants/data'
import { useI18nContext } from '$src/context/i18n'
import { useDataContext } from '$src/context/data'
import { classNames } from 'syw-common/helpers/ui'

const ProvenanceEmpty = () => {
	const { getText } = useI18nContext()
	const { phase } = useDataContext()

	return (
		<div
			className={classNames('ProvenanceEmpty')}
		>
			<span>
				{getText('provenance', phase === PHASE_KEYS.ERROR ? 'error' : 'empty')}
			</span>
		</div>
	)
}

export default ProvenanceEmpty
