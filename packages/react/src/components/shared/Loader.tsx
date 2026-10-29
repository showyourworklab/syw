import { Progress as ArkProgress } from '@ark-ui/react/progress'
import type { LoaderProps } from 'syw-common/types/components'
import { classNames } from 'syw-common/helpers/ui'

const Loader = ({
	loading = false,
	className
}: LoaderProps) => {

	return (
		<ArkProgress.Root
			defaultValue={null}
			className={classNames(
				'Loader',
				loading ? 'Loader_loading' : null,
				className
			)}
		>
			<div
				className={classNames('LoaderCircleContainer')}
			>
				<ArkProgress.Circle
					className={classNames('LoaderCircle')}
				>
					<ArkProgress.CircleTrack
						className={classNames('LoaderCircleTrack')}
					/>
					<ArkProgress.CircleRange
						className={classNames('LoaderCircleRange')}
					/>
				</ArkProgress.Circle>
			</div>
		</ArkProgress.Root>
	)
}

export default Loader