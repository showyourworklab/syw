import type { Snippet } from 'svelte';
import type { DetailProps } from 'syw-common/types/components';
type $$ComponentProps = DetailProps & {
    children?: Snippet;
};
declare const Detail: import("svelte").Component<$$ComponentProps, {}, "">;
type Detail = ReturnType<typeof Detail>;
export default Detail;
