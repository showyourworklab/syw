import { getContext, setContext } from 'svelte'
import { writable, get } from 'svelte/store'
import { createC2pa } from '@contentauth/c2pa-web'
import type { C2pa } from '@contentauth/c2pa-web'
import { C2PA_DATA_DEFAULT, PHASE_KEYS, TRUST_KEYS } from 'syw-common/constants/data'
import { getC2paConfig } from 'syw-common/helpers/c2pa'
import { prepareData, disposeSywData } from 'syw-common/helpers/data'
import type { C2paOptions } from 'syw-common/types/c2pa'
import type { MediaType, SywData } from 'syw-common/types/data'

const C2PA_CONTEXT_KEY = Symbol('c2pa')

const createC2paStore = () => {
	const c2pa = writable<C2pa | null>(null)
	const data = writable<SywData>(C2PA_DATA_DEFAULT)
	let requestId = 0
	let disposed = false

	const init = async (config: C2paOptions = {}): Promise<C2pa | null> => {
		try {
			const c2paInstance = await createC2pa(await getC2paConfig(config))
			// If disposed before init finished, dispose new instance
			if(disposed) {
				c2paInstance.dispose()
				return null
			}
			// If another init already set an instance, keep it and dispose new instance
			const existing = get(c2pa)
			if(existing) {
				c2paInstance.dispose()
				return existing
			}
			c2pa.set(c2paInstance)
			return c2paInstance
		} catch (err) {
			data.set({
				...C2PA_DATA_DEFAULT,
				phase: PHASE_KEYS.ERROR,
				trust: TRUST_KEYS.UNKNOWN,
				error: err as Error
			})
			return null
		}
	}

	const read = async ({ src, mediaType }: { src: string | null, mediaType: MediaType }): Promise<SywData | null> => {
		const c2paInstance = get(c2pa)
		const id = ++requestId

		if (!src) {
			return C2PA_DATA_DEFAULT
		}

		// Without a C2PA instance, prepareData still resolves the media type from the user or src
		const newData = await prepareData({
			c2pa: c2paInstance,
			src,
			mediaType,
		})

		// If another request started before this one finished, dispose new data
		if (id !== requestId) {
			disposeSywData(newData)
			return null
		}

		// If data is replaced, dispose old data
		disposeSywData(get(data))
		data.set(newData)

		return newData
	}

	const dispose = () => {
		disposed = true
		requestId++
		disposeSywData(get(data))
		data.set(C2PA_DATA_DEFAULT)
		get(c2pa)?.dispose()
		c2pa.set(null)
	}

	return { c2pa, data, init, read, dispose }
}

export default createC2paStore

export type C2paStore = ReturnType<typeof createC2paStore>

export const setC2paContext = (store: C2paStore) => setContext(C2PA_CONTEXT_KEY, store)
export const getC2paContext = () => getContext<C2paStore>(C2PA_CONTEXT_KEY)
