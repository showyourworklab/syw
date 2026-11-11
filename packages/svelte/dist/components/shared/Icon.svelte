<script lang="ts">
	import { Icon as LucideGenericIconComponent } from '@lucide/svelte'
	import type { LucideIcon } from '@lucide/svelte'
	import ShieldCheckIcon from '@lucide/svelte/icons/shield-check'
	import ShieldXIcon from '@lucide/svelte/icons/shield-x'
	import ShieldQuestionMarkIcon from '@lucide/svelte/icons/shield-question-mark'
	import ShieldAlertIcon from '@lucide/svelte/icons/shield-alert'
	import ShieldMinusIcon from '@lucide/svelte/icons/shield-minus'
	import CameraIcon from '@lucide/svelte/icons/camera'
	import SquarePenIcon from '@lucide/svelte/icons/square-pen'
	import SparklesIcon from '@lucide/svelte/icons/sparkles'
	import WandSparklesIcon from '@lucide/svelte/icons/wand-sparkles'
	import CirclePlusIcon from '@lucide/svelte/icons/circle-plus'
	import SlashIcon from '@lucide/svelte/icons/slash'
	import ClockIcon from '@lucide/svelte/icons/clock'
	import UserIcon from '@lucide/svelte/icons/user'
	import KeyRoundIcon from '@lucide/svelte/icons/key-round'
	import MapPinIcon from '@lucide/svelte/icons/map-pin'
	import ListIcon from '@lucide/svelte/icons/list'
	import BadgeCheckIcon from '@lucide/svelte/icons/badge-check'
	import IdCardIcon from '@lucide/svelte/icons/id-card'
	import ReceiptTextIcon from '@lucide/svelte/icons/receipt-text'
	import ShieldIcon from '@lucide/svelte/icons/shield'
	import InfoIcon from '@lucide/svelte/icons/info'
	import ImageIcon from '@lucide/svelte/icons/image'
	import ImageOffIcon from '@lucide/svelte/icons/image-off'
	import ChevronUpIcon from '@lucide/svelte/icons/chevron-up'
	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down'
	import XIcon from '@lucide/svelte/icons/x'
	import { ICON_DEFAULT_SIZE, ICON_DEFAULT_STROKE_WIDTH, SYW_ICONS } from 'syw-common/constants/ui'
	import { classNames, isSywIcon } from 'syw-common/helpers/ui'
	import type { IconProps } from 'syw-common/types/components'
	import type { LucideIconType } from 'syw-common/types/ui'

	const {
		type,
		size = ICON_DEFAULT_SIZE,
		strokeWidth = ICON_DEFAULT_STROKE_WIDTH,
		label,
		className
	}: IconProps = $props()

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

	const iconProps = $derived({
		size,
		strokeWidth,
		role: label ? 'img' : undefined,
		'aria-label': label ?? undefined,
		class: classNames(
			'Icon',
			`Icon_${type}`,
			className
		),
	})

	const LucideIconComponent = $derived(
		type && !isSywIcon(type)
			? LUCIDE_ICONS[type]
			: null
	)
</script>

{#if isSywIcon(type)}
	<LucideGenericIconComponent
		iconNode={SYW_ICONS[type]}
		{...iconProps}
	/>
{:else if LucideIconComponent}
	<LucideIconComponent
		{...iconProps}
	/>
{/if}
