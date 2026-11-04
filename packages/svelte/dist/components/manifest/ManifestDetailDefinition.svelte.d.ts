import type { Snippet } from 'svelte';
import type { ComponentProps } from 'syw-common/types/components';
type $$ComponentProps = ComponentProps & {
    children: Snippet;
};
declare const ManifestDetailDefinition: import("svelte").Component<$$ComponentProps, {}, "">;
type ManifestDetailDefinition = ReturnType<typeof ManifestDetailDefinition>;
export default ManifestDetailDefinition;
