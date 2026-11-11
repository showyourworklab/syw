import { classNames } from 'syw-common/helpers/ui'
import type { ComponentProps } from 'syw-common/types/components'
import ManifestDetailNote from '$src/components/manifest/ManifestDetailNote'

function ManifestDetailDefinition({ className, children }: ComponentProps) {
	return (
		<ManifestDetailNote
			icon="info"
			className={classNames('ManifestDetailDefinition', className)}
		>
			{children}
		</ManifestDetailNote>
	)
}

export default ManifestDetailDefinition
