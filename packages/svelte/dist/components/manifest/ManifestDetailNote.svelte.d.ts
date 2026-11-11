import type { Snippet } from 'svelte';
import type { ManifestDetailNoteProps } from 'syw-common/types/components';
type $$ComponentProps = ManifestDetailNoteProps & {
    children: Snippet;
};
declare const ManifestDetailNote: import("svelte").Component<$$ComponentProps, {}, "">;
type ManifestDetailNote = ReturnType<typeof ManifestDetailNote>;
export default ManifestDetailNote;
