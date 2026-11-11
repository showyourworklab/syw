import { classNames } from 'syw-common/helpers/ui'
import FigureCutline from '$src/components/figure/FigureCutline'
import FigureCaption from '$src/components/figure/FigureCaption'
import FigureMedia from '$src/components/figure/FigureMedia'

const Figure = () => {

	return (
		<figure
			className={classNames('Figure')}
		>
			<FigureMedia />
			<FigureCutline />
			<FigureCaption />
		</figure>
	)
}

export default Figure