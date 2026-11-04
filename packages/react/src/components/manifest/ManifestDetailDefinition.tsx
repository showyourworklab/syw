import { classNames } from 'syw-common/helpers/ui'
import type { ComponentProps } from 'syw-common/types/components'
import Icon from '$src/components/shared/Icon'

function ManifestDetailDefinition({ className, children }: ComponentProps) {
	return (
		<p
			className={classNames('ManifestDetailDefinition', className)}
		>
			<Icon
				type="info"
				className={classNames('ManifestDetailDefinitionIcon')}
			/>
			<span>
				{children}
			</span>
		</p>
	)
}

export default ManifestDetailDefinition
