import SywReact from './SywReact'
import { parseSywData as parseSywDataInternal } from 'syw-common/helpers/c2pa'
import type { SywData } from 'syw-common/types/c2pa'
import type { SywReactProps } from './types'

const parseSywData = (
	src: string,
	options?: {
		c2paOptions?: SywReactProps['c2paOptions']
	}
): Promise<SywData> => parseSywDataInternal(src, options)

export type { SywReactProps }
export { SywReact as default, SywReact, parseSywData }
