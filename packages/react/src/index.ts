// Relative imports on purpose: tsc copies them into the published .d.ts files, which can't resolve the $src alias
import SywReact from './SywReact'
import { parseSywData as parseSywDataInternal, disposeSywData } from 'syw-common/helpers/data'
import type { SywData } from 'syw-common/types/data'
import type { SywReactProps } from './types'

const parseSywData = (
	src: string,
	options?: {
		c2paOptions?: SywReactProps['c2paOptions']
		mediaType?: SywReactProps['mediaType']
	}
): Promise<SywData> => parseSywDataInternal(src, options)

export type { SywReactProps }
export { SywReact as default, SywReact, parseSywData, disposeSywData }
