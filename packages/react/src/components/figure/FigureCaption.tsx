import { classNames } from 'syw-common/helpers/ui'
import { useDataContext } from '$src/context/data'
import Markdown from '../shared/Markdown'

const FigureCaption = () => {
	const { caption, byline } = useDataContext()
	return caption || byline ? (
		<figcaption
			className={classNames('FigureCaption')}
		>
			<div
				className={classNames('FigureCaptionInner')}
			>
				<Markdown
					content={caption}
				/>
				<div
					className={classNames('FigureCaptionByline')}
				>
					{byline}
				</div>
			</div>
		</figcaption>
	) : null
}

export default FigureCaption