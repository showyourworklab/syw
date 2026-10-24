import type { ComponentProps, Snippet } from 'svelte';
import { Tooltip as ArkTooltip } from '@ark-ui/svelte/tooltip';
export interface TooltipProps {
    content?: string;
    disabled?: boolean;
    ContentProps?: ComponentProps<typeof ArkTooltip.Content>;
    className?: string;
    children?: Snippet;
}
declare const Tooltip: import("svelte").Component<TooltipProps, {}, "">;
type Tooltip = ReturnType<typeof Tooltip>;
export default Tooltip;
