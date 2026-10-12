<script lang="ts">
	import { Icon as LucideGenericIconComponent } from '@lucide/svelte'
	import type { LucideIcon } from '@lucide/svelte'
	import BadgeInfo from '@lucide/svelte/icons/badge-info'
	import Camera from '@lucide/svelte/icons/camera'
	import Check from '@lucide/svelte/icons/check'
	import Ellipsis from '@lucide/svelte/icons/ellipsis'
	import SquarePen from '@lucide/svelte/icons/square-pen'
	import Sparkles from '@lucide/svelte/icons/sparkles'
	import TriangleAlert from '@lucide/svelte/icons/triangle-alert'
	import ImageOff from '@lucide/svelte/icons/image-off'
	import ChevronUp from '@lucide/svelte/icons/chevron-up'
	import ChevronDown from '@lucide/svelte/icons/chevron-down'
	import CircleQuestionMark from '@lucide/svelte/icons/circle-question-mark'
	import X from '@lucide/svelte/icons/x'
	import { ICON_DEFAULT_SIZE, ICON_DEFAULT_STROKE_WIDTH } from 'syw-common/constants'
	import { SYW_ICONS } from 'syw-common/constants/ui'
	import { classNames, isSywIcon } from 'syw-common/helpers'
	import type { IconProps } from 'syw-common/types/components'
	import type { LucideIconType } from 'syw-common/types/ui'

	const {
		type,
		size = ICON_DEFAULT_SIZE,
		strokeWidth = ICON_DEFAULT_STROKE_WIDTH,
		className
	}: IconProps = $props()

	const LUCIDE_ICONS: Record<LucideIconType, LucideIcon> = {
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

	const iconProps = $derived({
		size,
		strokeWidth,
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
