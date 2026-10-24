import { classNames } from 'syw-common/helpers/ui'
import type { ManifestSectionProps } from 'syw-common/types/components'
import ManifestDetail from '$src/components/manifest/ManifestDetail'
import Icon from '$src/components/shared/Icon'

function ManifestSection({ title, titleIcon, definition, className, children }: ManifestSectionProps) {
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
							{titleIcon ?
								<Icon
									type={titleIcon}
									className={classNames('ManifestSectionTitleIcon')}
								/>
							: null}
							<span>
								{title}
							</span>
						</div>
					: null}
					{definition ?
						<ManifestDetail
							className={classNames('ManifestSectionDefinition')}
						>
							{definition}
						</ManifestDetail>
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
