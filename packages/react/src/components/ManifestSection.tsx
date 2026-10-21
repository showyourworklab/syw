import { classNames } from 'syw-common/helpers/ui'
import type { ManifestSectionProps } from 'syw-common/types/components'

function ManifestSection({ title, className, children }: ManifestSectionProps) {
	return (
		<section
			className={classNames('ManifestSection', className)}
		>
			{title ?
				<div
					className={classNames('ManifestSectionTitle')}
				>
					{title}
				</div>
			: null}
			{children}
		</section>
	)
}

export default ManifestSection
