import { classNames } from 'syw-common/helpers/ui'
import type { ManifestDetailToggleProps } from 'syw-common/types/components'
import Icon from '$src/components/shared/Icon'

function ManifestDetailToggle({
	open,
	value,
	subtitle,
	onToggle,
	className
}: ManifestDetailToggleProps) {
	return (
		<button
			type="button"
			aria-expanded={open}
			className={classNames('ManifestDetailToggle', className)}
			onClick={onToggle}
		>
			<span
				className={classNames('ManifestDetailToggleText')}
			>
				<span
					className={classNames('ManifestDetailToggleValue')}
				>
					{value}
				</span>
				{subtitle ?
					<span
						className={classNames('ManifestDetailToggleSubtitle')}
					>
						{subtitle}
					</span>
				: null}
			</span>
			<Icon
				type={open ? 'up' : 'down'}
			/>
		</button>
	)
}

export default ManifestDetailToggle
