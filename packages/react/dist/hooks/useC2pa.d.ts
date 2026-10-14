import type { MediaType, SywData } from 'syw-common/types/data';
interface UseC2paProps {
    src: string | null;
    mediaType: MediaType;
}
declare const useC2pa: ({ src, mediaType }: UseC2paProps) => SywData;
export default useC2pa;
