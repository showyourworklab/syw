import { classNames } from 'syw-common/helpers/ui'
import type { ManifestDetailNoteProps } from 'syw-common/types/components'
import Icon from '$src/components/shared/Icon'

function ManifestDetailNote({ icon, className, children }: ManifestDetailNoteProps) {
	return (
		<span
			className={classNames('ManifestDetailNote', className)}
		>
			<Icon
				type={icon}
				className={classNames('ManifestDetailNoteIcon')}
			/>
			<span
				className={classNames('ManifestDetailNoteText')}
			>
				{children}
			</span>
		</span>
	)
}

export default ManifestDetailNote
