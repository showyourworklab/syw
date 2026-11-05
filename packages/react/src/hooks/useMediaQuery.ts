import { useSyncExternalStore } from 'react'
import { MEDIA_QUERIES } from 'syw-common/constants/ui'
import type { MediaQueryKey } from 'syw-common/types/ui'

/**
 * Whether a named media query currently matches, updating when it changes
 * @param key - Media query name, like 'sm'
 * @return Whether the query matches, false when rendered on the server
 */
const useMediaQuery = (key: MediaQueryKey): boolean => useSyncExternalStore(
	(onChange) => {
		const mediaQueryList = window.matchMedia(MEDIA_QUERIES[key])
		mediaQueryList.addEventListener('change', onChange)
		return () => mediaQueryList.removeEventListener('change', onChange)
	},
	() => window.matchMedia(MEDIA_QUERIES[key]).matches,
	() => false,
)

export default useMediaQuery
