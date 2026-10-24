import { Camera, Ellipsis, SquarePen, Sparkles, WandSparkles, ImageOff, X, ChevronDown, ChevronUp, CircleQuestionMark, Icon as LucideGenericIconComponent, Slash, ShieldCheck, ShieldX, ShieldAlert, ShieldQuestionMark } from 'lucide-react'
import type { IconNode, LucideIcon } from 'lucide-react'
import { ICON_DEFAULT_SIZE, ICON_DEFAULT_STROKE_WIDTH, SYW_ICONS } from 'syw-common/constants/ui'
import type { IconProps } from 'syw-common/types/components'
import type { LucideIconType, SywIconType } from 'syw-common/types/ui'
import { classNames, isSywIcon } from 'syw-common/helpers/ui'

const LUCIDE_ICONS: Record<LucideIconType, LucideIcon> = {
	// Trust
	validating: Ellipsis,
	trusted: ShieldCheck,
	trusted_legacy: ShieldAlert,
	valid: ShieldAlert,
	invalid: ShieldX,
	unknown: ShieldQuestionMark,
	none: ShieldX,
	// Type
	camera: Camera,
	edit: SquarePen,
	ai_create: Sparkles,
	ai_edit: WandSparkles,
	unknown_create: Slash,
	// Misc.
	missing: ImageOff,
	up: ChevronUp,
	down: ChevronDown,
	info: CircleQuestionMark,
	close: X,
}

const getSywIconNode = (type: SywIconType): IconNode =>
	SYW_ICONS[type].map(([tag, attrs], index) => [
		tag, {
			...attrs,
			key: `${type}-${index}`
		}
	])

const Icon = ({
	type,
	size = ICON_DEFAULT_SIZE,
	strokeWidth = ICON_DEFAULT_STROKE_WIDTH,
	className
}: IconProps) => {

	const iconProps = {
		size,
		strokeWidth,
		className: classNames(
			'Icon',
			`Icon_${type}`,
			className
		),
	}

	const LucideIconComponent = type && !isSywIcon(type)
		? LUCIDE_ICONS[type]
		: null

	if(isSywIcon(type)) {
		return (
			<LucideGenericIconComponent
				iconNode={getSywIconNode(type)}
				{...iconProps}
			/>
		)
	} else if(LucideIconComponent) {
		return (
			<LucideIconComponent
				{...iconProps}
			/>
		)
	}


}

export default Icon
