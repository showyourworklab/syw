import { classNames } from 'syw-common/helpers/ui'
import { useDataContext } from '$src/context/data'
import { useUiContext } from '$src/context/ui'

const Image = () => {
	const {
		src,
		alt,
	} = useDataContext()
	const { imageAttrs: {
		className,
		...imageAttrs
	} } = useUiContext()

	return (
		<div
			className={classNames('Image')}
		>
			<img
				{...imageAttrs}
				src={src ?? undefined}
				alt={alt ?? undefined}
				className={[
					classNames('ImageImg'),
					className
				].filter(Boolean).join(' ')}
			/>
		</div>
	)
}

export default Image