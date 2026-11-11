import type { Snippet } from 'svelte';
import type { ManifestDetailHeaderProps } from 'syw-common/types/components';
type $$ComponentProps = ManifestDetailHeaderProps & {
    value?: string | Snippet | null;
};
declare const ManifestDetailHeader: import("svelte").Component<$$ComponentProps, {}, "">;
type ManifestDetailHeader = ReturnType<typeof ManifestDetailHeader>;
export default ManifestDetailHeader;
