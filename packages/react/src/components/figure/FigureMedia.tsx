import { classNames } from 'syw-common/helpers/ui'
import { useDataContext } from '$src/context/data'
import Image from '$src/components/shared/Image'
import Video from '$src/components/shared/Video'

const FigureMedia = () => {
	const {
		mediaType,
	} = useDataContext()

	return (
		<div
			className={classNames('FigureMedia')}
		>
			{/* Anything that isn't a video is shown as an image */}
			{mediaType === "video"
				? <Video />
				: <Image />
			}
		</div>
	)
}

export default FigureMedia