import { useCallback } from 'react'
import type { KeyboardEvent, MouseEvent } from 'react'
import { classNames, handleA11yClick } from 'syw-common/helpers'
import { useUiContext } from '$src/context/ui'
import { useDataContext } from '$src/context/data'
import Image from './Image'
import Video from './Video'

const isClickableElem = (event: { target: EventTarget | null }) =>
	["IMG", "VIDEO"].includes((event.target as HTMLElement | null)?.tagName ?? '')

const Media = () => {
	const {
		mediaType,
	} = useDataContext()
	const {
		hoverImage,
		unhoverImage,
		openProvenance,
		closeProvenance,
		isProvenanceOpen,
	} = useUiContext()

	const onClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
		if(isClickableElem(event)) {
			if(isProvenanceOpen) {
				closeProvenance(event)
			} else {
				openProvenance(event)
			}
		}
	}, [openProvenance, closeProvenance, isProvenanceOpen])

	const onKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
		if(isClickableElem(event)) {
			handleA11yClick(
				event,
				isProvenanceOpen
					? closeProvenance
					: openProvenance
			)
		}
	}, [openProvenance, closeProvenance, isProvenanceOpen])

	const onMouseEnter = useCallback((event: MouseEvent<HTMLDivElement>) =>
		hoverImage(event)
	, [hoverImage])

	const onMouseLeave = useCallback((event: MouseEvent<HTMLDivElement>) =>
		unhoverImage(event)
	, [unhoverImage])

	return (
		<div
			role="button"
			tabIndex={0}
			onClick={onClick}
			onKeyDown={onKeyDown}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			className={classNames('Media')}
		>
			{/* Fall back to an image when the media type is unknown */}
			{mediaType === "video"
				? <Video />
				: <Image />
			}
		</div>
	)
}

export default Media