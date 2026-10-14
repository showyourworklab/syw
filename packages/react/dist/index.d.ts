import SywReact from './SywReact';
import { disposeSywData } from 'syw-common/helpers/data';
import type { SywData } from 'syw-common/types/data';
import type { SywReactProps } from './types';
declare const parseSywData: (src: string, options?: {
    c2paOptions?: SywReactProps["c2paOptions"];
    mediaType?: SywReactProps["mediaType"];
}) => Promise<SywData>;
export type { SywReactProps };
export { SywReact as default, SywReact, parseSywData, disposeSywData };
