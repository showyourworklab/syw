import { useCallback, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { C2pa } from 'syw-common/types/c2pa'
import { getSharedC2pa } from 'syw-common/helpers/c2pa'
import type { C2paOptions } from 'syw-common/types/c2pa'
import { C2paContext } from '$src/context/c2pa'

interface C2paProviderProps {
	c2paOptions?: C2paOptions
	children: ReactNode
}

const C2paProvider = ({
	c2paOptions = {},
	children
}: C2paProviderProps) => {
	const [c2pa, setC2pa] = useState<C2pa | null>(null)
	const [error, setError] = useState<Error | null>(null)
	const [isRequested, setIsRequested] = useState(false)
	const loadC2pa = useCallback(() => setIsRequested(true), [])

	useEffect(() => {
		if(!isRequested) return
		let cancelled = false
		getSharedC2pa(c2paOptions)
			.then(instance => { if(!cancelled) setC2pa(instance) })
			.catch(err => { if(!cancelled) setError(err as Error) })
		return () => { cancelled = true }
	}, [isRequested])

	return (
		<C2paContext.Provider
			value={{
				c2pa,
				error,
				loadC2pa,
			}}
		>
			{children}
		</C2paContext.Provider>
	)
}

export default C2paProvider
