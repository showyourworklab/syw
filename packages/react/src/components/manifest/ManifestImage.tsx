import { useState } from 'react'
import type { CSSProperties, SyntheticEvent } from 'react'
import { classNames } from 'syw-common/helpers/ui'
import type { ManifestImageProps } from 'syw-common/types/components'
import Icon from '../shared/Icon'

function ManifestImage({ manifest, className }: ManifestImageProps) {
	const [loaded, setLoaded] = useState<{ src: string, ratio: number } | null>(null)
	const ratio = loaded && loaded.src === manifest?.thumbnail ? loaded.ratio : null

	const handleLoad = (event: SyntheticEvent<HTMLImageElement>) => {
		const { naturalWidth, naturalHeight, currentSrc, src } = event.currentTarget
		if(naturalWidth && naturalHeight) {
			setLoaded({ src: manifest?.thumbnail ?? currentSrc ?? src, ratio: naturalWidth / naturalHeight })
		}
	}

	return (
		<div
			className={classNames(
				'ManifestImage',
				!manifest?.thumbnail ? 'ManifestImage_missing' : null,
				ratio ? 'ManifestImage_sized' : null,
				className,
			)}
			style={ratio ? { '--syw-manifest-image-ratio': ratio } as CSSProperties : undefined}
		>
			{manifest?.thumbnail ?
				<img
					alt=''
					src={manifest.thumbnail}
					className={classNames('ManifestImageThumbnail')}
					onLoad={handleLoad}
				/>
			: <Icon type="missing" />}
		</div>
	)
}

export default ManifestImage
