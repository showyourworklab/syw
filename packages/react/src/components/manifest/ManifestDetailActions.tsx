import { useState } from 'react'
import { classNames, getManifestDisplayActions } from 'syw-common/helpers/ui'
import { isIptcDigitalSourceTypeAi } from 'syw-common/helpers/iptc'
import type { ManifestDetailActionsProps } from 'syw-common/types/components'
import { useI18nContext } from '$src/context'
import ManifestDetail from '$src/components/manifest/ManifestDetail'
import ManifestDetailActionsItem from '$src/components/manifest/ManifestDetailActionsItem'

function ManifestDetailActions({ manifest }: ManifestDetailActionsProps) {
	const { getText } = useI18nContext()
	const [listOpen, setListOpen] = useState(false)

	const actions = getManifestDisplayActions(manifest)
	const actionsIncludeAi = actions.some(action => isIptcDigitalSourceTypeAi(action.iptc))

	if(!actions.length) return null

	return (
		<ManifestDetail
			title={getText('actions')}
			titleIcon="actions"
			trust={manifest.actions?.trust}
			className={classNames('ManifestDetailActions')}
			open={listOpen}
			value={getText('actions', actionsIncludeAi ? 'ai' : 'human')}
			prompt={getText('actions', 'list', listOpen ? 'hide' : 'show')}
			onToggle={() => setListOpen(!listOpen)}
		>
			<ul
				className={classNames('ManifestDetailActionsList')}
			>
				{actions.map((action, index) =>
					<ManifestDetailActionsItem
						key={index}
						action={action}
					/>
				)}
			</ul>
		</ManifestDetail>
	)
}

export default ManifestDetailActions
