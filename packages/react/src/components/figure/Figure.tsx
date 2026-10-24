import { classNames } from 'syw-common/helpers/ui'
import type { ComponentProps } from 'syw-common/types/components'

const Figure = ({
	children
}: ComponentProps) => {

	return (
		<figure
			className={classNames('Figure')}
		>
			{children}
		</figure>
	)
}

export default Figure