import type { MediaType, SywData } from 'syw-common/types/data';
import type { ManifestOverride } from 'syw-common/types/demo';
interface UseC2paProps {
    src: string | null;
    mediaType?: MediaType | null;
    manifestOverrides?: ManifestOverride[];
}
declare const useC2pa: ({ src, mediaType, manifestOverrides }: UseC2paProps) => SywData;
export default useC2pa;
