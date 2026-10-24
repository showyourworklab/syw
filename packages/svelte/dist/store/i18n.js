import { getContext, setContext } from 'svelte';
import { writable } from 'svelte/store';
import { LOCALE_DEFAULT } from 'syw-common/constants/i18n';
import { getLocaleText, getLangFromLocale } from 'syw-common/helpers/i18n';
const I18N_CONTEXT_KEY = Symbol('i18n');
export default function createI18nStore() {
    const locale = writable(LOCALE_DEFAULT);
    const lang = writable(getLangFromLocale(LOCALE_DEFAULT));
    const setLocale = (val) => {
        const newLocale = val ?? LOCALE_DEFAULT;
        const newLang = getLangFromLocale(newLocale);
        locale.set(newLocale);
        lang.set(newLang);
    };
    const getText = (locale, ...args) => {
        return getLocaleText(locale, ...args);
    };
    return {
        locale,
        lang,
        setLocale,
        getText
    };
}
export const setI18nContext = (store) => setContext(I18N_CONTEXT_KEY, store);
export const getI18nContext = () => getContext(I18N_CONTEXT_KEY);
