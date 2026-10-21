import type { ManifestIdentityProps } from 'syw-common/types/components'
import { classNames } from 'syw-common/helpers/ui'
import { useI18nContext } from '$src/context'
import ManifestSection from './ManifestSection'

function ManifestIdentity({ manifest }: ManifestIdentityProps) {
	const { getText } = useI18nContext()

	return (
		<ManifestSection
			title={getText('section', 'identity')}
			className={classNames('ManifestIdentity')}
		>
			{/* TODO: identity content */}
		</ManifestSection>
	)
}

export default ManifestIdentity
