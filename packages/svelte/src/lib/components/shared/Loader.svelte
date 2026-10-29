<script lang="ts">
	import { Progress as ArkProgress } from '@ark-ui/svelte/progress'
	import type { LoaderProps } from 'syw-common/types/components'
	import { classNames } from 'syw-common/helpers/ui'

	const {
		loading = false,
		className
	}: LoaderProps = $props()
</script>

<ArkProgress.Root
	defaultValue={null}
	class={classNames(
		'Loader',
		loading ? 'Loader_loading' : null,
		className
	)}
>
	<div
		class={classNames('LoaderCircleContainer')}
	>
		<ArkProgress.Circle
			class={classNames('LoaderCircle')}
		>
			<ArkProgress.CircleTrack
				class={classNames('LoaderCircleTrack')}
			/>
			<ArkProgress.CircleRange
				class={classNames('LoaderCircleRange')}
			/>
		</ArkProgress.Circle>
	</div>
</ArkProgress.Root>
