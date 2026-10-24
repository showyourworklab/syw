import type { BadgeProps } from 'syw-common/types/components';
import type { TooltipProps } from '$src/components/shared/Tooltip';
interface ReactBadgeProps extends BadgeProps {
    TooltipProps?: Omit<TooltipProps, 'children'>;
}
declare const Badge: ({ type, TooltipProps: tooltipProps, children, className }: ReactBadgeProps) => import("react").JSX.Element;
export default Badge;
