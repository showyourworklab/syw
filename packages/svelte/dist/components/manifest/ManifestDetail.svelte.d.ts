import type { Snippet } from 'svelte';
import type { ManifestDetailProps } from 'syw-common/types/components';
type $$ComponentProps = ManifestDetailProps & {
    value?: string | Snippet | null;
    children?: Snippet;
};
declare const ManifestDetail: import("svelte").Component<$$ComponentProps, {}, "">;
type ManifestDetail = ReturnType<typeof ManifestDetail>;
export default ManifestDetail;
