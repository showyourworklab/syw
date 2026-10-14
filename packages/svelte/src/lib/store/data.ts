import { getContext, setContext } from 'svelte'
import { writable } from 'svelte/store'
import { C2PA_DATA_DEFAULT } from 'syw-common/constants/data'
import { resolveMediaType } from 'syw-common/helpers/data'
import type { SywData, SywMediaData } from 'syw-common/types/data'

const DATA_CONTEXT_KEY = Symbol('data')

export default function createDataStore(initial: Partial<Pick<SywMediaData, 'src' | 'alt' | 'caption' | 'byline' | 'mediaType'>> = {}) {
	const src = writable<SywMediaData['src']>(initial.src ?? null)
	const alt = writable<SywMediaData['alt']>(initial.alt ?? null)
	const caption = writable<SywMediaData['caption']>(initial.caption ?? null)
	const byline = writable<SywMediaData['byline']>(initial.byline ?? null)
	const phase = writable(C2PA_DATA_DEFAULT.phase)
	const trust = writable(C2PA_DATA_DEFAULT.trust)
	const types = writable(C2PA_DATA_DEFAULT.types)
	const manifests = writable(C2PA_DATA_DEFAULT.manifests)
	const mediaType = writable(resolveMediaType(initial.src, initial.mediaType))
	const provenance = writable(C2PA_DATA_DEFAULT.provenance)
	const reader = writable(C2PA_DATA_DEFAULT.reader)
	const error = writable(C2PA_DATA_DEFAULT.error)

	const setSrc = (val: SywMediaData['src']) => src.set(val)
	const setAlt = (val: SywMediaData['alt']) => alt.set(val)
	const setCaption = (val: SywMediaData['caption']) => caption.set(val)
	const setByline = (val: SywMediaData['byline']) => byline.set(val)
	const setPhase = (val: SywData['phase']) => phase.set(val)
	const setTrust = (val: SywData['trust']) => trust.set(val)
	const setTypes = (val?: SywData['types'] | null) => types.set(val ?? [])
	const setMediaType = (val: SywData['mediaType']) => mediaType.set(val)
	const setManifests = (val?: SywData['manifests'] | null) => manifests.set(val ?? [])
	const setProvenance = (val?: SywData['provenance'] | null) => provenance.set(val ?? null)
	const setReader = (val?: SywData['reader'] | null) => reader.set(val ?? null)
	const setError = (val?: SywData['error'] | null) => error.set(val ?? null)

	const setC2paData = (c2paData: SywData = C2PA_DATA_DEFAULT) => {
		setPhase(c2paData.phase)
		setTrust(c2paData.trust)
		setManifests(c2paData.manifests)
		setTypes(c2paData.types)
		setMediaType(c2paData.mediaType)
		setProvenance(c2paData.provenance)
		setReader(c2paData.reader)
		setError(c2paData.error)
	}

	return {
		src,
		alt,
		caption,
		byline,
		phase,
		trust,
		types,
		manifests,
		mediaType,
		provenance,
		reader,
		error,
		setSrc,
		setAlt,
		setCaption,
		setByline,
		setPhase,
		setTrust,
		setTypes,
		setManifests,
		setMediaType,
		setProvenance,
		setReader,
		setError,
		setC2paData
	}
}

export type DataStore = ReturnType<typeof createDataStore>

export const setDataContext = (store: DataStore) => setContext(DATA_CONTEXT_KEY, store)
export const getDataContext = () => getContext<DataStore>(DATA_CONTEXT_KEY)
