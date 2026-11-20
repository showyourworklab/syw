import type { Snippet } from 'svelte';
import type { ChipProps } from 'syw-common/types/components';
type $$ComponentProps = ChipProps & {
    children?: Snippet;
};
declare const Chip: import("svelte").Component<$$ComponentProps, {}, "">;
type Chip = ReturnType<typeof Chip>;
export default Chip;
