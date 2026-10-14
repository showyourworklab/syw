import { classNames } from 'syw-common/helpers/ui'
import { useDataContext } from '$src/context/data'
import Markdown from './Markdown'

const Caption = () => {
	const { caption, byline } = useDataContext()
	return caption || byline ? (
		<figcaption
			className={classNames('Caption')}
		>
			<div
				className={classNames('CaptionInner')}
			>
				<Markdown
					content={caption}
				/>
				<div
					className={classNames('CaptionByline')}
				>
					{byline}
				</div>
			</div>
		</figcaption>
	) : null
}

export default Caption