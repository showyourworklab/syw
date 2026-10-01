import type { SywData } from 'syw-common/types/c2pa';
interface UseC2paProps {
    src: string | null;
}
declare const useC2pa: ({ src }: UseC2paProps) => SywData;
export default useC2pa;
