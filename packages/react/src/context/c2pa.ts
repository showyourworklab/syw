import { createContext, useContext } from 'react'
import type { C2pa } from '@contentauth/c2pa-web'

interface C2paContextValue {
	c2pa: C2pa | null
	error: Error | null
	loadC2pa: () => void
}

const C2paContext = createContext<C2paContextValue>({
	c2pa: null,
	error: null,
	loadC2pa: () => {},
});

const useC2paContext = () => useContext(C2paContext)

export { C2paContext, useC2paContext }
