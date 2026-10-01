import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { createC2pa } from '@contentauth/c2pa-web'
import type { C2paSdk } from '@contentauth/c2pa-web'
import { getC2paConfig } from 'syw-common/helpers/c2pa'
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
	const [c2pa, setC2pa] = useState<C2paSdk | null>(null)
	useEffect(() => {
		let disposed = false
		let instance: C2paSdk | null = null
		const initC2pa = async () => {
			const c2paInstance = await createC2pa(getC2paConfig(c2paOptions))
			// If another init already set an instance, keep it and dispose new instance
			if(disposed) {
				c2paInstance.dispose()
				return
			}
			instance = c2paInstance
			setC2pa(c2paInstance)
		}
		initC2pa()
		return () => {
			disposed = true
			instance?.dispose()
			setC2pa(null)
		}
	}, [])

	return (
		<C2paContext.Provider
			value={{
				c2pa,
			}}
		>
			{children}
		</C2paContext.Provider>
	)
}

export default C2paProvider