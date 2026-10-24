import type { BadgeProps } from 'syw-common/types/components';
import type { TooltipProps } from './Tooltip.svelte';
interface Props extends BadgeProps {
    TooltipProps?: Omit<TooltipProps, 'children'>;
}
declare const Badge: import("svelte").Component<Props, {}, "">;
type Badge = ReturnType<typeof Badge>;
export default Badge;
