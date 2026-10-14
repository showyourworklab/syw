import { createContext, useContext } from 'react'
import { C2PA_DATA_DEFAULT } from 'syw-common/constants/data'
import type { SywMediaData } from 'syw-common/types/data'

const DataContext = createContext<SywMediaData>({
	src: null,
	alt: null,
	caption: null,
	byline: null,
	...C2PA_DATA_DEFAULT,
})

const useDataContext = () => useContext(DataContext)

export { DataContext, useDataContext }