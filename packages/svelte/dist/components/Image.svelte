<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import { getDataContext } from '../store/data.js'

	const { src, alt } = getDataContext()
</script>

<div
	class={classNames('Image')}
>
	<img
		src={$src}
		alt={$alt}
		class={classNames('ImageImg')}
	/>
</div>
