import type { ReactNode } from 'react';
import type { MediaType, SywMediaData } from 'syw-common/types/c2pa';
interface DataProviderProps extends Pick<SywMediaData, 'src' | 'alt' | 'caption' | 'byline'> {
    mediaType: MediaType;
    children: ReactNode;
}
declare const DataProvider: ({ src, alt, caption, byline, mediaType, children }: DataProviderProps) => import("react").JSX.Element;
export default DataProvider;
