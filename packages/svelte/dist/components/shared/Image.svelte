<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import { getDataContext } from '../../store/data.js'
	import { getUiContext } from '../../store/ui.js'

	const { src, alt } = getDataContext()
	const { imageAttrs } = getUiContext()
</script>

<div
	class={classNames('Image')}
>
	<img
		{...$imageAttrs}
		src={$src}
		alt={$alt}
		class={[
			classNames('ImageImg'),
			$imageAttrs.class
		]}
	/>
</div>
