import type { ReactNode } from 'react'
import type { DictionaryArgs } from 'syw-common/types/i18n'
import { getLocaleText } from 'syw-common/helpers/i18n'
import { I18nContext } from '$src/context/i18n'

interface I18nProviderProps {
	locale: string
	children: ReactNode
}

const I18nProvider = ({
	locale,
	children
}: I18nProviderProps) => {

	const getText = (...args: DictionaryArgs) => getLocaleText(locale, ...args)

	return (
		<I18nContext.Provider
			value={{
				locale,
				getText,
			}}
		>
			{children}
		</I18nContext.Provider>
	)
}

export default I18nProvider
