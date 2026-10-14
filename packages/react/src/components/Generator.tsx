import { classNames } from 'syw-common/helpers/ui'
import type { ManifestGeneratorEntry } from 'syw-common/types/data'

function Generator({ name, icon }: ManifestGeneratorEntry) {
	return (
		<div
			className={classNames('Generator')}
		>
			{icon ?
				<img
					alt=""
					src={icon}
					className={classNames('GeneratorIcon')}
				/>
			: null}
			<span>
				{name}
			</span>
		</div>
	)
}

export default Generator
