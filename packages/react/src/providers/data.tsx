import { useMemo } from 'react'
import type { ReactNode } from 'react'
import type { SywMediaData } from 'syw-common/types/c2pa'
import { DataContext } from '$src/context/data'
import useC2pa from '$src/hooks/useC2pa'

interface DataProviderProps extends Pick<SywMediaData, 'src' | 'alt' | 'caption' | 'byline'> {
	children: ReactNode
}

const DataProvider = ({
	src,
	alt,
	caption,
	byline,
	children
}: DataProviderProps) => {
	const c2paData = useC2pa({ src })

	const value = useMemo(() => ({
		...c2paData,
		src,
		alt,
		caption,
		byline
	}), [c2paData, src, alt, caption, byline])

	return (
		<DataContext.Provider value={value}>
			{children}
		</DataContext.Provider>
	)
}

export default DataProvider