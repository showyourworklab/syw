import type { ReactNode } from 'react';
import type { MediaType, SywMediaData } from 'syw-common/types/data';
import type { ManifestOverride } from 'syw-common/types/demo';
interface DataProviderProps extends Pick<SywMediaData, 'src' | 'alt' | 'caption' | 'byline'> {
    mediaType?: MediaType | null;
    manifestOverrides?: ManifestOverride[];
    children: ReactNode;
}
declare const DataProvider: ({ src, alt, caption, byline, mediaType, manifestOverrides, children }: DataProviderProps) => import("react").JSX.Element;
export default DataProvider;
