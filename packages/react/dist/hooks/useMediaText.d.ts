import type { DictionaryArgs } from 'syw-common/types/i18n';
/**
 * Like getText, but uses the `_<mediaType>` version of the text when there is one (i.e. video wording for videos)
 */
declare const useMediaText: () => (...args: DictionaryArgs) => string;
export default useMediaText;
