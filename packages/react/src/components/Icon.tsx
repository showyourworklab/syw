import { BadgeInfo, Camera, Check, Ellipsis, SquarePen, Sparkles, TriangleAlert, ImageOff, X, ChevronDown, ChevronUp, CircleQuestionMark, Icon as LucideGenericIconComponent } from 'lucide-react'
import type { IconNode, LucideIcon } from 'lucide-react'
import {  ICON_DEFAULT_SIZE, ICON_DEFAULT_STROKE_WIDTH } from 'syw-common/constants'
import { SYW_ICONS } from 'syw-common/constants/ui'
import type { IconProps } from 'syw-common/types/components'
import type { LucideIconType, SywIconType } from 'syw-common/types/ui'
import { classNames, isSywIcon } from 'syw-common/helpers'

const LUCIDE_ICONS: Record<LucideIconType, LucideIcon> = {
	origin: BadgeInfo,
	validating: Ellipsis,
	trusted: Check,
	trusted_legacy: Check,
	valid: Check,
	invalid: X,
	unknown: TriangleAlert,
	camera: Camera,
	edit: SquarePen,
	ai: Sparkles,
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
