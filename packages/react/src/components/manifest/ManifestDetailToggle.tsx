import { classNames } from 'syw-common/helpers/ui'
import type { ManifestDetailToggleProps } from 'syw-common/types/components'
import Collapse from '$src/components/shared/Collapse'
import Icon from '$src/components/shared/Icon'

function ManifestDetailToggle({
	open,
	value,
	subtitle,
	onToggle,
	className,
	children
}: ManifestDetailToggleProps) {
	return (
		<div
			className={classNames(
				'ManifestDetailToggle',
				open ? 'ManifestDetailToggle_open' : null,
				className,
			)}
		>
			<button
				type="button"
				aria-expanded={open}
				className={classNames('ManifestDetailToggleButton')}
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
			<Collapse
				open={open}
			>
				<div
					className={classNames('ManifestDetailToggleContent')}
				>
					{children}
				</div>
			</Collapse>
		</div>
	)
}

export default ManifestDetailToggle
