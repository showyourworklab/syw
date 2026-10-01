import { getContext, setContext } from 'svelte'
import { writable, get } from 'svelte/store'
import { createC2pa } from '@contentauth/c2pa-web'
import type { C2paSdk } from '@contentauth/c2pa-web'
import { C2PA_DATA_DEFAULT, C2PA_PHASES, C2PA_STATUSES } from 'syw-common/constants/c2pa'
import { getC2paConfig, prepareData } from 'syw-common/helpers/c2pa'
import type { C2paOptions, SywData } from 'syw-common/types/c2pa'

const C2PA_CONTEXT_KEY = Symbol('c2pa')

const createC2paStore = () => {
	const c2pa = writable<C2paSdk | null>(null)
	const data = writable<SywData>(C2PA_DATA_DEFAULT)
	let requestId = 0

	const init = async (config: C2paOptions = {}): Promise<C2paSdk | null> => {
		try {
			const c2paInstance = await createC2pa(getC2paConfig(config))
			c2pa.set(c2paInstance)
			return c2paInstance
		} catch (err) {
			data.set({
				...C2PA_DATA_DEFAULT,
				phase: C2PA_PHASES.ERROR,
				status: C2PA_STATUSES.UNKNOWN,
				error: err as Error
			})
			return null
		}
	}

	const read = async ({ src }: { src: string | null }): Promise<SywData> => {
		const c2paInstance = get(c2pa)
		const id = ++requestId

		if (!src) {
			return C2PA_DATA_DEFAULT
		}

		if (!c2paInstance) {
			return C2PA_DATA_DEFAULT
		}

		const newData = await prepareData({
			c2pa: c2paInstance,
			src,
		})

		if (id === requestId) data.set(newData)

		return newData
	}

	return { c2pa, data, init, read }
}

export default createC2paStore

export type C2paStore = ReturnType<typeof createC2paStore>

export const setC2paContext = (store: C2paStore) => setContext(C2PA_CONTEXT_KEY, store)
export const getC2paContext = () => getContext<C2paStore>(C2PA_CONTEXT_KEY)
