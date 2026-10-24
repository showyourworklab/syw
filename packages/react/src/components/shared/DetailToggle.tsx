import { classNames } from 'syw-common/helpers/ui'
import type { DetailToggleProps } from 'syw-common/types/components'
import Icon from '$src/components/shared/Icon'

function DetailToggle({ open, value, subtitle, onToggle, className }: DetailToggleProps) {
	return (
		<button
			type="button"
			aria-expanded={open}
			className={classNames('DetailToggle', className)}
			onClick={onToggle}
		>
			<span
				className={classNames('DetailToggleText')}
			>
				<span
					className={classNames('DetailToggleValue')}
				>
					{value}
				</span>
				{subtitle ?
					<span
						className={classNames('DetailToggleSubtitle')}
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

export default DetailToggle
