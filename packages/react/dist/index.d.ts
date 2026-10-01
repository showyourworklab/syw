import SywReact from './SywReact';
import { disposeSywData } from 'syw-common/helpers/c2pa';
import type { SywData } from 'syw-common/types/c2pa';
import type { SywReactProps } from './types';
declare const parseSywData: (src: string, options?: {
    c2paOptions?: SywReactProps["c2paOptions"];
}) => Promise<SywData>;
export type { SywReactProps };
export { SywReact as default, SywReact, parseSywData, disposeSywData };
