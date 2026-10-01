import { classNames } from 'syw-common/helpers'
import type { ManifestIdentityProps } from 'syw-common/types/components'

function ManifestIdentity({ manifest }: ManifestIdentityProps) {
	return (
		<div
			className={classNames('ManifestIdentity')}
		>
			<dl
				className={classNames('ManifestIdentityList')}
			>
				<dt
					className={classNames('ManifestIdentityLabel')}
				>
					Verified Identity
				</dt>
				<dd
					className={classNames('ManifestIdentityValue')}
				>
					{manifest.identity?.name}
				</dd>
			</dl>
		</div>
	)
}

export default ManifestIdentity