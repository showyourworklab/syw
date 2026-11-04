import { useI18nContext } from '$src/context/i18n'
import { useDataContext } from '$src/context/data'
import { classNames } from 'syw-common/helpers/ui'

const ProvenanceEmpty = () => {
	const { getText } = useI18nContext()
	const { mediaType } = useDataContext()

	return (
		<div
			className={classNames('ProvenanceEmpty')}
		>
			<span
				className={classNames('ProvenanceEmptyTitle')}
			>
				{getText('provenance', 'empty', mediaType)}
			</span>
			<p
				className={classNames('ProvenanceEmptyDefinition')}
			>
				{getText('provenance', 'empty', 'definition', mediaType)}
			</p>
		</div>
	)
}

export default ProvenanceEmpty
