import type { Snippet } from 'svelte';
import type { ManifestSectionProps } from 'syw-common/types/components';
type $$ComponentProps = ManifestSectionProps & {
    children?: Snippet;
};
declare const ManifestSection: import("svelte").Component<$$ComponentProps, {}, "">;
type ManifestSection = ReturnType<typeof ManifestSection>;
export default ManifestSection;
