import type { ManifestIdentityProps } from 'syw-common/types/components'
import { classNames } from 'syw-common/helpers/ui'
import { useI18nContext } from '$src/context'
import ManifestSection from './ManifestSection'
import Detail from './Detail'

function ManifestIdentity({ manifest }: ManifestIdentityProps) {
	const { getText } = useI18nContext()

	return (
		manifest.identity ?
			<ManifestSection
				title={getText('section', 'identity')}
				className={classNames('ManifestIdentity')}
			>
				<Detail
					title={getText('identity', 'name')}
					className={classNames('ManifestIdentityName')}
				>
					{manifest.identity.name}
				</Detail>
			</ManifestSection>
		: null
	)
}

export default ManifestIdentity
