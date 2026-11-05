import type { MediaQueryKey } from 'syw-common/types/ui';
/**
 * Whether a named media query currently matches, updating when it changes
 * @param key - Media query name, like 'sm'
 * @return Whether the query matches, false when rendered on the server
 */
declare const useMediaQuery: (key: MediaQueryKey) => boolean;
export default useMediaQuery;
