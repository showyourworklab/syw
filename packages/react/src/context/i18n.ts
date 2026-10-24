import { createContext, useContext } from 'react'
import type { DictionaryArgs } from 'syw-common/types/i18n'
import { LOCALE_DEFAULT } from 'syw-common/constants/i18n'

interface I18nContextValue {
	locale: string
	getText: (...args: DictionaryArgs) => string | null
}

const I18nContext = createContext<I18nContextValue>({
	locale: LOCALE_DEFAULT,
	getText: () => null,
})

const useI18nContext = () => useContext(I18nContext)

export { I18nContext, useI18nContext }
