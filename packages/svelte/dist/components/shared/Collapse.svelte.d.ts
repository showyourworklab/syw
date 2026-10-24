import type { Snippet } from 'svelte';
import type { CollapseProps } from 'syw-common/types/components';
type $$ComponentProps = Pick<CollapseProps, 'open'> & {
    children: Snippet;
};
declare const Collapse: import("svelte").Component<$$ComponentProps, {}, "">;
type Collapse = ReturnType<typeof Collapse>;
export default Collapse;
