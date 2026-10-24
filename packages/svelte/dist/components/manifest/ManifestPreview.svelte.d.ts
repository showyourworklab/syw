import type { ManifestPreviewProps } from 'syw-common/types/components';
type $$ComponentProps = Pick<ManifestPreviewProps, 'open' | 'manifest' | 'tabKeys'> & {
    previewRef?: ((el: HTMLElement | null) => void) | null;
};
declare const ManifestPreview: import("svelte").Component<$$ComponentProps, {}, "">;
type ManifestPreview = ReturnType<typeof ManifestPreview>;
export default ManifestPreview;
