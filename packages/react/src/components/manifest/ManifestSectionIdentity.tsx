import type { ManifestSectionIdentityProps } from 'syw-common/types/components'
import { classNames } from 'syw-common/helpers/ui'
import { useI18nContext } from '$src/context'
import ManifestSection from './ManifestSection'
import Detail from '../shared/Detail'

function ManifestSectionIdentity({ manifest }: ManifestSectionIdentityProps) {
	const { getText } = useI18nContext()

	return (
		manifest.identity ?
			<ManifestSection
				title={getText('section', 'identity')}
				className={classNames('ManifestSectionIdentity')}
			>
				<Detail
					title={getText('identity', 'name')}
					className={classNames('ManifestSectionIdentityName')}
				>
					{manifest.identity.name}
				</Detail>
			</ManifestSection>
		: null
	)
}

export default ManifestSectionIdentity
