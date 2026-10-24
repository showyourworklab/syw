import { classNames } from 'syw-common/helpers/ui'
import { useDataContext } from '$src/context/data'

const Image = () => {
	const {
		src,
		alt,
	} = useDataContext()

	return (
		<div
			className={classNames('Image')}
		>
			<img
				src={src ?? undefined}
				alt={alt ?? undefined}
				className={classNames('ImageImg')}
			/>
		</div>
	)
}

export default Image