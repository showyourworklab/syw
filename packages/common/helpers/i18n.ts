import type { Locale, Lang, DictionaryKey } from '#types/i18n'
import {
	LANG_DEFAULT,
	LOCALE_DEFAULT,
	LOCALE_DEFAULTS,
	DICTIONARIES,
	DATE_OPTIONS,
	TIME_OPTIONS,
} from '#constants/i18n'

/**
 * Check if input is an ISO language code (i.e. en)
 * @param input
 * @returns boolean
 */
const isLang = (input: string): input is Lang =>
	LOCALE_DEFAULTS.hasOwnProperty(input)

/**
 * Check if input is an ISO locale code (i.e. en_US)
 * @param input
 * @returns boolean
 */
const isLocale = (input: string): input is Locale =>
	DICTIONARIES.hasOwnProperty(input)

/**
 * Gets the language code from a locale code
 * @param locale - ISO locale code (i.e. en_US)
 * @returns ISO language code (i.e. en)
 */
export const getLangFromLocale = (locale: string): string => {
	const localeSplit = locale?.split('_')
	const lang = localeSplit && localeSplit[0]
	return lang
}

/**
 * Gets the default locale code from a language code
 * @param lang - ISO language code (i.e. en)
 * @returns ISO locale code (i.e. en_US)
 */
export const getDefaultLocaleFromLang = (lang: string): Locale => {
	const locale = isLang(lang)
		? LOCALE_DEFAULTS[lang]
		: LOCALE_DEFAULTS[LANG_DEFAULT]
	return locale
}

/**
 * Gets the default locale code using the language code of another locale code
 * This can be used to find an alternative locale code in the same language when the given locale is not available
 * @param locale - ISO locale code (i.e. en_ZA)
 * @returns ISO locale code (i.e. en_US)
 */
export const getDefaultLocaleFromLocale = (locale: string): Locale => {
	const lang = getLangFromLocale(locale)
	const defaultLocale = getDefaultLocaleFromLang(lang)
	return defaultLocale
}

/**
 * Gets a locale code that exists in the dictionary
 * If passed locale is valid, it will be returned
 * If it doesn't exist, but another locale with that lang, that locale will be returned
 * Otherwise, the default locale will be returned
 * @param locale - ISO locale code (i.e. en_US)
 * @returns ISO locale code (i.e. en_US)
 */
export const getSafeLocale = (locale: string): Locale => {
	let safeLocale: Locale
	// Does this locale exist?
	if(isLocale(locale)) {
		safeLocale = locale
	} else {
		// Does this locale's language have a default locale available?
		const defaultLocale = getDefaultLocaleFromLocale(locale)
		if(isLocale(defaultLocale)) {
			safeLocale = defaultLocale
		} else {
			safeLocale = LOCALE_DEFAULT
		}
	}
	return safeLocale
}

/**
 * Gets the text dictionary for the given locale code
 * @param locale - ISO locale code (i.e. en_US)
 * @returns Dictionary of text strings for given locale
 */
export const getDictionary = (locale: string): Record<string, string> => {
	const safeLocale = getSafeLocale(locale)
	const dictionary = DICTIONARIES[safeLocale]
	return dictionary
}

/**
 * Parses a locale code for its language code
 * @param keys - An array spread of strings to be joined with underscores and used as a key in the dictionary (i.e. x, y, z becomes x_y_z)
 * @returns The string from the dictionary
 */
export const getLocaleText = (locale: string, ...keys: DictionaryKey[]): string => {
	const dictionary = getDictionary(locale)
	const text = dictionary[keys.filter(k => k !== null && k !== undefined).join('_')]
	return text
}

/**
 * Gets a human-readable date string for a given locale
 * @param locale -
 * @param timestamp -
 * @returns dateString
 */
export const getDateString = (
	locale: string,
	timestamp?: {
		date?: Date,
		offset?: string | null
	}
): string | null => {
	if(!timestamp) return null
	const { date, offset } = timestamp
	const isValidDate = date && date instanceof Date && isFinite(date.getTime())
	if(!isValidDate) return null
	const dateOpts = { ...DATE_OPTIONS, timeZone: offset ?? undefined }
	const timeOpts = { ...TIME_OPTIONS, timeZone: offset ?? undefined }
	const localeOpt = locale.replace('_', '-')

	let dateString, timeString
	try {
		dateString = date.toLocaleDateString(localeOpt, dateOpts)
		timeString = date.toLocaleTimeString(localeOpt, timeOpts)
	} catch {
		// Fallback for engines without offset-identifier support (only available ES2026 and up)
		if(offset) {
			const sign = offset[0] === '-' ? -1 : 1
			const [h, m] = offset.slice(1).split(':').map(Number)
			const shifted = new Date(date.getTime() + sign * (h * 60 + m) * 60000)
			dateString = shifted.toLocaleDateString(localeOpt, { ...dateOpts, timeZone: 'UTC' })
			timeString = shifted.toLocaleTimeString(localeOpt, { ...timeOpts, timeZone: 'UTC' })
		} else {
			return null
		}
	}
	return `${dateString}, ${timeString}`
}
