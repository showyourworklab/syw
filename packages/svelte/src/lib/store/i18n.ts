import { getContext, setContext } from 'svelte'
import { writable } from 'svelte/store'
import type { DictionaryArgs } from 'syw-common/types/i18n'
import type { MediaType } from 'syw-common/types/data'
import { LOCALE_DEFAULT } from 'syw-common/constants/i18n'
import { getLocaleText, getLocaleMediaText, getLangFromLocale } from 'syw-common/helpers/i18n'

const I18N_CONTEXT_KEY = Symbol('i18n')

export default function createI18nStore() {
	const locale = writable<string>(LOCALE_DEFAULT)
	const lang = writable<string>(getLangFromLocale(LOCALE_DEFAULT))
	const setLocale = (val: string | null | undefined) => {
		const newLocale = val ?? LOCALE_DEFAULT
		const newLang = getLangFromLocale(newLocale)
		locale.set(newLocale)
		lang.set(newLang)
	}
	const getText = (locale: string, ...args: DictionaryArgs) => {
		return getLocaleText(locale, ...args)
	}
	// Like getText, but uses the _<mediaType> version of the text when there is one (i.e. video wording for videos)
	const getMediaText = (locale: string, mediaType: MediaType | null | undefined, ...args: DictionaryArgs) => {
		return getLocaleMediaText(locale, mediaType, ...args)
	}

	return {
		locale,
		lang,
		setLocale,
		getText,
		getMediaText
	}
}

export type I18nStore = ReturnType<typeof createI18nStore>

export const setI18nContext = (store: I18nStore) => setContext(I18N_CONTEXT_KEY, store)
export const getI18nContext = () => getContext<I18nStore>(I18N_CONTEXT_KEY)
