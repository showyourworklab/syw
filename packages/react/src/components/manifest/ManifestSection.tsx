import { classNames } from 'syw-common/helpers/ui'
import type { ManifestSectionProps } from 'syw-common/types/components'
import Detail from '../shared/Detail'

function ManifestSection({ title, definition, className, children }: ManifestSectionProps) {
	return (
		<section
			className={classNames(
				'ManifestSection',
				className
			)}
		>
			{title || definition ?
				<div
					className={classNames('ManifestSectionHeader')}
				>
					{title ?
						<div
							className={classNames('ManifestSectionTitle')}
						>
							{title}
						</div>
					: null}
					{definition ?
						<Detail
							className={classNames('ManifestSectionDefinition')}
						>
							{definition}
						</Detail>
					: null}
				</div>
			: null}
			<div
				className={classNames('ManifestSectionContent')}
			>
				{children}
			</div>
		</section>
	)
}

export default ManifestSection
