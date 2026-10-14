import type { RefObject } from 'react';
import type { Manifest as ManifestData } from 'syw-common/types/data';
interface ManifestProps {
    manifest: ManifestData;
    previewRef: RefObject<HTMLDivElement> | null;
}
declare function Manifest({ manifest, previewRef }: ManifestProps): import("react").JSX.Element;
export default Manifest;
