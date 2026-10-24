import type { RefObject } from 'react';
import type { ManifestPreviewProps } from 'syw-common/types/components';
interface ReactManifestPreviewProps extends ManifestPreviewProps {
    previewRef: RefObject<HTMLDivElement> | null;
}
declare function ManifestPreview({ open, manifest, tabKeys, onToggle, previewRef }: ReactManifestPreviewProps): import("react").JSX.Element;
export default ManifestPreview;
