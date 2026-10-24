import type { DICTIONARIES, LOCALE_DEFAULTS } from '#constants/i18n'

export type Locale = keyof typeof DICTIONARIES
export type Lang = keyof typeof LOCALE_DEFAULTS
export type DictionaryKey = string | number | null
export type DictionaryReplacements = Record<string, string | number | null | undefined>
export type DictionaryArgs = DictionaryKey[] | [...DictionaryKey[], DictionaryReplacements]
