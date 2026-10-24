import '@videojs/react/video/skin.css'
import { createPlayer, videoFeatures } from '@videojs/react'
import { VideoSkin, Video as VideoJs } from '@videojs/react/video'
import { classNames } from 'syw-common/helpers/ui'
import { useDataContext } from '$src/context/data'

const Player = createPlayer({
	features: videoFeatures
})

const Video = () => {
	const {
		src,
		alt,
	} = useDataContext()
	return (
		<div
			className={classNames('Video')}
		>
			<Player.Provider>
				<VideoSkin
					className={classNames('VideoSkin')}
				>
					<VideoJs
						src={src ?? undefined}
						aria-label={alt ?? undefined}
						playsInline
						className={classNames('Video')}
					/>
				</VideoSkin>
			</Player.Provider>
		</div>
	)
}

export default Video