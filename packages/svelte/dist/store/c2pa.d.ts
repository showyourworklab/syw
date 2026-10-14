import type { C2pa } from '@contentauth/c2pa-web';
import type { C2paOptions } from 'syw-common/types/c2pa';
import type { MediaType, SywData } from 'syw-common/types/data';
declare const createC2paStore: () => {
    c2pa: import("svelte/store").Writable<C2pa | null>;
    data: import("svelte/store").Writable<SywData>;
    init: (config?: C2paOptions) => Promise<C2pa | null>;
    read: ({ src, mediaType }: {
        src: string | null;
        mediaType: MediaType;
    }) => Promise<SywData | null>;
    dispose: () => void;
};
export default createC2paStore;
export type C2paStore = ReturnType<typeof createC2paStore>;
export declare const setC2paContext: (store: C2paStore) => {
    c2pa: import("svelte/store").Writable<C2pa | null>;
    data: import("svelte/store").Writable<SywData>;
    init: (config?: C2paOptions) => Promise<C2pa | null>;
    read: ({ src, mediaType }: {
        src: string | null;
        mediaType: MediaType;
    }) => Promise<SywData | null>;
    dispose: () => void;
};
export declare const getC2paContext: () => {
    c2pa: import("svelte/store").Writable<C2pa | null>;
    data: import("svelte/store").Writable<SywData>;
    init: (config?: C2paOptions) => Promise<C2pa | null>;
    read: ({ src, mediaType }: {
        src: string | null;
        mediaType: MediaType;
    }) => Promise<SywData | null>;
    dispose: () => void;
};
