import type { DictionaryArgs } from 'syw-common/types/i18n'
import { getLocaleMediaText } from 'syw-common/helpers/i18n'
import { useDataContext, useI18nContext } from '$src/context'

/**
 * Like getText, but uses the `_<mediaType>` version of the text when there is one (i.e. video wording for videos)
 */
const useMediaText = () => {
	const { locale } = useI18nContext()
	const { mediaType } = useDataContext()
	return (...args: DictionaryArgs) => getLocaleMediaText(locale, mediaType, ...args)
}

export default useMediaText
