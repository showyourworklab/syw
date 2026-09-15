<script lang="ts">
    import BadgeInfo from '@lucide/svelte/icons/badge-info';
	import Camera from '@lucide/svelte/icons/camera'
	import Check from '@lucide/svelte/icons/check'
	import Ellipsis from '@lucide/svelte/icons/ellipsis'
	import SquarePen from '@lucide/svelte/icons/square-pen'
	import Sparkles from '@lucide/svelte/icons/sparkles'
	import TriangleAlert from '@lucide/svelte/icons/triangle-alert'
	import ImageOff from '@lucide/svelte/icons/image-off'
	import ChevronUp from '@lucide/svelte/icons/chevron-up'
	import ChevronDown from '@lucide/svelte/icons/chevron-down'
	import X from '@lucide/svelte/icons/x'
	import { ICON_DEFAULT_SIZE, ICON_DEFAULT_STROKE_WIDTH } from 'syw-common/constants'
	import { classNames } from 'syw-common/helpers'
	import type { IconProps } from 'syw-common/types/components'
	import type { IconType } from 'syw-common/types/ui'
    import { CircleQuestionMark } from '@lucide/svelte';

	const {
		type,
		size = ICON_DEFAULT_SIZE,
		strokeWidth = ICON_DEFAULT_STROKE_WIDTH,
		className
	}: IconProps = $props()

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

	const IconComponent = $derived((type ? ICONS[type] : undefined) ?? ICONS["validating"])
</script>

{#if IconComponent}
	<IconComponent
		size={size}
		strokeWidth={strokeWidth}
		class={classNames(
			'Icon',
			`Icon_${type}`,
			className
		)}
	/>
{/if}
