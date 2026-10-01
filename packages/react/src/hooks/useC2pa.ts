import { useState, useEffect, useRef } from 'react'
import { C2PA_DATA_DEFAULT, C2PA_PHASES } from 'syw-common/constants/c2pa'
import { prepareData } from 'syw-common/helpers/c2pa'
import type { SywData } from 'syw-common/types/c2pa'
import { useC2paContext } from '$src/context/c2pa'

interface UseC2paProps {
	src: string | null
}

const useC2pa = ({ src }: UseC2paProps): SywData => {
	const { c2pa } = useC2paContext()
	const [data, setData] = useState(C2PA_DATA_DEFAULT)
	const requestIdRef = useRef(0)

	useEffect(() => {
		const id = ++requestIdRef.current

		if (!src || !c2pa) {
			setData(C2PA_DATA_DEFAULT)
			return
		}

		setData(prev => ({
			...prev,
			phase: C2PA_PHASES.LOADING
		}))

		;(async () => {
			const newData = await prepareData({ c2pa, src })
			// if (import.meta.env.DEV) {
			// 	console.log({ src, ...newData })
			// }
			if (id === requestIdRef.current) setData(newData)
		})()
	}, [src, c2pa])

	return data
}

export default useC2pa