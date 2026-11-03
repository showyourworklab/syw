import { Info, Image, Slash, BadgeCheck, IdCard, ReceiptText, Shield, CirclePlus, Clock, KeyRound, List, MapPin, User, Camera, SquarePen, Sparkles, WandSparkles, ImageOff, X, ChevronDown, ChevronUp, CircleQuestionMark, Icon as LucideGenericIconComponent, ShieldCheck, ShieldX, ShieldAlert, ShieldQuestionMark } from 'lucide-react'
import type { IconNode, LucideIcon } from 'lucide-react'
import { ICON_DEFAULT_SIZE, ICON_DEFAULT_STROKE_WIDTH, SYW_ICONS } from 'syw-common/constants/ui'
import type { IconProps } from 'syw-common/types/components'
import type { LucideIconType, SywIconType } from 'syw-common/types/ui'
import { classNames, isSywIcon } from 'syw-common/helpers/ui'

const LUCIDE_ICONS: Record<LucideIconType, LucideIcon> = {
	// Integrity
	valid: ShieldCheck,
	invalid: ShieldX,
	unavailable: ShieldQuestionMark,
	// Trust
	trusted: ShieldCheck,
	trusted_legacy: ShieldAlert,
	untrusted: ShieldAlert,
	untrusted_expired: ShieldAlert,
	// Type
	camera: Camera,
	edit: SquarePen,
	ai_create: Sparkles,
	ai_edit: WandSparkles,
	unknown: CirclePlus,
	unknown_create: Slash,
	none: Slash,
	// Detail
	timestamp: Clock,
	producer: User,
	signator: KeyRound,
	location: MapPin,
	actions: List,
	identity: BadgeCheck,
	// Section
	section_identity: IdCard,
	section_primary: ReceiptText,
	section_trust: Shield,
	// Tab
	tab_info: Info,
	tab_image: Image,
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
