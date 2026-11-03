import { classNames } from 'syw-common/helpers/ui'
import type { ManifestEmptyProps } from 'syw-common/types/components'
import { useI18nContext } from '$src/context'
import ManifestDetail from '$src/components/manifest/ManifestDetail'

function ManifestEmpty({ manifest, className }: ManifestEmptyProps) {
	const { getText } = useI18nContext()
	const emptyKey = manifest.validation?.integrity ?? manifest.type?.key ?? null

	return (
		<div
			className={classNames('ManifestEmpty', emptyKey ? `ManifestEmpty_${emptyKey}` : null, className)}
		>
			<ManifestDetail
				className={classNames('ManifestEmptyDetail')}
			>
				{getText('empty', emptyKey)}
			</ManifestDetail>
		</div>
	)
}

export default ManifestEmpty
