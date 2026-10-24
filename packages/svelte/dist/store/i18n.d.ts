import type { DictionaryArgs } from 'syw-common/types/i18n';
import type { MediaType } from 'syw-common/types/data';
export default function createI18nStore(): {
    locale: import("svelte/store").Writable<string>;
    lang: import("svelte/store").Writable<string>;
    setLocale: (val: string | null | undefined) => void;
    getText: (locale: string, ...args: DictionaryArgs) => string;
    getMediaText: (locale: string, mediaType: MediaType | null | undefined, ...args: DictionaryArgs) => string;
};
export type I18nStore = ReturnType<typeof createI18nStore>;
export declare const setI18nContext: (store: I18nStore) => {
    locale: import("svelte/store").Writable<string>;
    lang: import("svelte/store").Writable<string>;
    setLocale: (val: string | null | undefined) => void;
    getText: (locale: string, ...args: DictionaryArgs) => string;
    getMediaText: (locale: string, mediaType: MediaType | null | undefined, ...args: DictionaryArgs) => string;
};
export declare const getI18nContext: () => {
    locale: import("svelte/store").Writable<string>;
    lang: import("svelte/store").Writable<string>;
    setLocale: (val: string | null | undefined) => void;
    getText: (locale: string, ...args: DictionaryArgs) => string;
    getMediaText: (locale: string, mediaType: MediaType | null | undefined, ...args: DictionaryArgs) => string;
};
