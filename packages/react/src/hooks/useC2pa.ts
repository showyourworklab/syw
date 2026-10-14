import { useState, useEffect, useRef } from 'react'
import { C2PA_DATA_DEFAULT, PHASE_KEYS } from 'syw-common/constants/data'
import { prepareData, disposeSywData } from 'syw-common/helpers/data'
import type { MediaType, SywData } from 'syw-common/types/data'
import { useC2paContext } from '$src/context/c2pa'

interface UseC2paProps {
	src: string | null
	mediaType: MediaType
}

const useC2pa = ({ src, mediaType }: UseC2paProps): SywData => {
	const { c2pa } = useC2paContext()
	const [data, setData] = useState(C2PA_DATA_DEFAULT)
	const requestIdRef = useRef(0)
	// Read the latest media type without re-running the C2PA read when it changes
	const mediaTypeRef = useRef(mediaType)
	mediaTypeRef.current = mediaType

	useEffect(() => {
		const id = ++requestIdRef.current
		const cancel = () => { requestIdRef.current++ }

		if (!src || !c2pa) {
			setData(C2PA_DATA_DEFAULT)
			return cancel
		}

		setData(prev => ({
			...prev,
			phase: PHASE_KEYS.LOADING
		}))

		;(async () => {
			const newData = await prepareData({ c2pa, src, mediaType: mediaTypeRef.current })
			// if (import.meta.env.DEV) {
			// 	console.log({ src, ...newData })
			// }
			if (id === requestIdRef.current) {
				setData(newData)
			} else {
				// If another request started before this one finished, dispose new data
				disposeSywData(newData)
			}
		})()

		return cancel
	}, [src, c2pa])

	// If data is replaced or unmounted, dispose old data
	useEffect(() => () => disposeSywData(data), [data.manifests, data.reader])

	return data
}

export default useC2pa