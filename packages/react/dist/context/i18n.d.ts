import type { DictionaryArgs } from 'syw-common/types/i18n';
interface I18nContextValue {
    locale: string;
    getText: (...args: DictionaryArgs) => string | null;
}
declare const I18nContext: import("react").Context<I18nContextValue>;
declare const useI18nContext: () => I18nContextValue;
export { I18nContext, useI18nContext };
