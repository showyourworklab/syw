import { useMemo } from 'react'
import type { ReactNode } from 'react'
import { PHASE_KEYS } from 'syw-common/constants/data'
import { resolveMediaType } from 'syw-common/helpers/data'
import type { MediaType, SywMediaData } from 'syw-common/types/data'
import { DataContext } from '$src/context/data'
import useC2pa from '$src/hooks/useC2pa'

interface DataProviderProps extends Pick<SywMediaData, 'src' | 'alt' | 'caption' | 'byline'> {
	mediaType?: MediaType | null
	children: ReactNode
}

const DataProvider = ({
	src,
	alt,
	caption,
	byline,
	mediaType,
	children
}: DataProviderProps) => {
	const c2paData = useC2pa({ src, mediaType })

	const value = useMemo(() => ({
		...c2paData,
		// Take the user's media type as fact, then the type found by the finished C2PA read (even if it failed after fetching), then guess from src
		mediaType: resolveMediaType(
			src,
			mediaType,
			c2paData.phase === PHASE_KEYS.READY || c2paData.phase === PHASE_KEYS.ERROR
				? c2paData.mediaType
				: null
		),
		src,
		alt,
		caption,
		byline
	}), [c2paData, src, alt, caption, byline, mediaType])

	return (
		<DataContext.Provider value={value}>
			{children}
		</DataContext.Provider>
	)
}

export default DataProvider