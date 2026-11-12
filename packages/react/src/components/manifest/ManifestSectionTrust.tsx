import type { ManifestSectionTrustProps } from 'syw-common/types/components'
import { classNames } from 'syw-common/helpers/ui'
import { useI18nContext, useDataContext } from '$src/context'
import ManifestSection from '$src/components/manifest/ManifestSection'

function ManifestSectionTrust({ className }: ManifestSectionTrustProps) {
	const { getText } = useI18nContext()
	const { mediaType } = useDataContext()

	return (
		<ManifestSection
			title={getText('section', 'trust')}
			titleIcon="section_trust"
			definition={getText('section', 'trust', 'definition', mediaType)}
			className={classNames('ManifestSectionTrust', className)}
		/>
	)
}

export default ManifestSectionTrust
