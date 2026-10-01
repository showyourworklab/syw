import { classNames } from 'syw-common/helpers'
import type { ManifestGeneratorEntry } from 'syw-common/types/c2pa'

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
