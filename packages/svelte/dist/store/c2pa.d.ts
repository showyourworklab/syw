import type { C2paSdk } from '@contentauth/c2pa-web';
import type { C2paOptions, SywData } from 'syw-common/types/c2pa';
declare const createC2paStore: () => {
    c2pa: import("svelte/store").Writable<C2paSdk | null>;
    data: import("svelte/store").Writable<SywData>;
    init: (config?: C2paOptions) => Promise<C2paSdk | null>;
    read: ({ src, locale }: {
        src: string | null;
        locale: string;
    }) => Promise<SywData>;
};
export default createC2paStore;
export type C2paStore = ReturnType<typeof createC2paStore>;
export declare const setC2paContext: (store: C2paStore) => {
    c2pa: import("svelte/store").Writable<C2paSdk | null>;
    data: import("svelte/store").Writable<SywData>;
    init: (config?: C2paOptions) => Promise<C2paSdk | null>;
    read: ({ src, locale }: {
        src: string | null;
        locale: string;
    }) => Promise<SywData>;
};
export declare const getC2paContext: () => {
    c2pa: import("svelte/store").Writable<C2paSdk | null>;
    data: import("svelte/store").Writable<SywData>;
    init: (config?: C2paOptions) => Promise<C2paSdk | null>;
    read: ({ src, locale }: {
        src: string | null;
        locale: string;
    }) => Promise<SywData>;
};
