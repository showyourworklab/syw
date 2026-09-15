import { useMemo } from 'react'
import { BadgeInfo, Camera, Check, Ellipsis, SquarePen, Sparkles, TriangleAlert, ImageOff, X, ChevronDown, ChevronUp, CircleQuestionMark } from 'lucide-react'
import {  ICON_DEFAULT_SIZE, ICON_DEFAULT_STROKE_WIDTH } from 'syw-common/constants'
import type { IconProps } from 'syw-common/types/components'
import type { IconType } from 'syw-common/types/ui'
import { classNames } from 'syw-common/helpers'

export const ICONS: Record<IconType, typeof BadgeInfo> = {
	origin: BadgeInfo,
	validating: Ellipsis,
	trusted: Check,
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

const Icon = ({
	type,
	size = ICON_DEFAULT_SIZE,
	strokeWidth = ICON_DEFAULT_STROKE_WIDTH,
	className
}: IconProps) => {

	const IconComponent = useMemo(() =>
		(type ? ICONS[type] : undefined) ?? ICONS["validating"]
	, [type])

	return (
		IconComponent ?
			<IconComponent
				size={size}
				strokeWidth={strokeWidth}
				className={classNames(
					'Icon',
					`Icon_${type}`,
					className
				)}
			/>
		: null
	)
}

export default Icon