import { getContext, setContext } from 'svelte';
import { writable } from 'svelte/store';
import { C2PA_DATA_DEFAULT } from 'syw-common/constants/data';
import { resolveMediaType } from 'syw-common/helpers/data';
const DATA_CONTEXT_KEY = Symbol('data');
export default function createDataStore(initial = {}) {
    const src = writable(initial.src ?? null);
    const alt = writable(initial.alt ?? null);
    const caption = writable(initial.caption ?? null);
    const byline = writable(initial.byline ?? null);
    const phase = writable(C2PA_DATA_DEFAULT.phase);
    const trust = writable(C2PA_DATA_DEFAULT.trust);
    const types = writable(C2PA_DATA_DEFAULT.types);
    const manifests = writable(C2PA_DATA_DEFAULT.manifests);
    const mediaType = writable(resolveMediaType(initial.src, initial.mediaType));
    const provenance = writable(C2PA_DATA_DEFAULT.provenance);
    const reader = writable(C2PA_DATA_DEFAULT.reader);
    const error = writable(C2PA_DATA_DEFAULT.error);
    const setSrc = (val) => src.set(val);
    const setAlt = (val) => alt.set(val);
    const setCaption = (val) => caption.set(val);
    const setByline = (val) => byline.set(val);
    const setPhase = (val) => phase.set(val);
    const setTrust = (val) => trust.set(val);
    const setTypes = (val) => types.set(val ?? []);
    const setMediaType = (val) => mediaType.set(val);
    const setManifests = (val) => manifests.set(val ?? []);
    const setProvenance = (val) => provenance.set(val ?? null);
    const setReader = (val) => reader.set(val ?? null);
    const setError = (val) => error.set(val ?? null);
    const setC2paData = (c2paData = C2PA_DATA_DEFAULT) => {
        setPhase(c2paData.phase);
        setTrust(c2paData.trust);
        setManifests(c2paData.manifests);
        setTypes(c2paData.types);
        setMediaType(c2paData.mediaType);
        setProvenance(c2paData.provenance);
        setReader(c2paData.reader);
        setError(c2paData.error);
    };
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
    };
}
export const setDataContext = (store) => setContext(DATA_CONTEXT_KEY, store);
export const getDataContext = () => getContext(DATA_CONTEXT_KEY);
