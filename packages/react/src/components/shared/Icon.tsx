import {
	Icon as LucideGenericIconComponent,
	ShieldCheckIcon,
	ShieldXIcon,
	ShieldQuestionMarkIcon,
	ShieldAlertIcon,
	ShieldMinusIcon,
	CameraIcon,
	SquarePenIcon,
	SparklesIcon,
	WandSparklesIcon,
	CirclePlusIcon,
	SlashIcon,
	ClockIcon,
	UserIcon,
	KeyRoundIcon,
	MapPinIcon,
	ListIcon,
	BadgeCheckIcon,
	IdCardIcon,
	ReceiptTextIcon,
	ShieldIcon,
	InfoIcon,
	ImageIcon,
	ImageOffIcon,
	ChevronUpIcon,
	ChevronDownIcon,
	XIcon,
} from 'lucide-react'
import type { IconNode, LucideIcon } from 'lucide-react'
import { ICON_DEFAULT_SIZE, ICON_DEFAULT_STROKE_WIDTH, SYW_ICONS } from 'syw-common/constants/ui'
import type { IconProps } from 'syw-common/types/components'
import type { LucideIconType, SywIconType } from 'syw-common/types/ui'
import { classNames, isSywIcon } from 'syw-common/helpers/ui'

const LUCIDE_ICONS: Record<LucideIconType, LucideIcon> = {
	// Integrity
	valid: ShieldCheckIcon,
	invalid: ShieldXIcon,
	unavailable: ShieldQuestionMarkIcon,
	// Trust
	trusted: ShieldCheckIcon,
	trusted_legacy: ShieldAlertIcon,
	untrusted: ShieldAlertIcon,
	untrusted_expired: ShieldAlertIcon,
	reported: ShieldMinusIcon,
	// Type
	camera: CameraIcon,
	edit: SquarePenIcon,
	ai_create: SparklesIcon,
	ai_edit: WandSparklesIcon,
	unknown: CirclePlusIcon,
	unknown_create: SlashIcon,
	none: SlashIcon,
	// Detail
	timestamp: ClockIcon,
	producer: UserIcon,
	signator: KeyRoundIcon,
	location: MapPinIcon,
	actions: ListIcon,
	identity: BadgeCheckIcon,
	// Section
	section_identity: IdCardIcon,
	section_primary: ReceiptTextIcon,
	section_trust: ShieldIcon,
	// Tab
	tab_info: InfoIcon,
	tab_image: ImageIcon,
	// Misc.
	missing: ImageOffIcon,
	up: ChevronUpIcon,
	down: ChevronDownIcon,
	info: InfoIcon,
	close: XIcon,
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
	label,
	className
}: IconProps) => {

	const iconProps = {
		size,
		strokeWidth,
		role: label ? 'img' : undefined,
		'aria-label': label ?? undefined,
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
