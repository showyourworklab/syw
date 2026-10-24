import { useState } from 'react'
import { classNames } from 'syw-common/helpers/ui'
import { isIptcDigitalSourceTypeAi } from 'syw-common/helpers/iptc'
import type { ManifestDetailActionsProps } from 'syw-common/types/components'
import { useI18nContext } from '$src/context'
import ManifestDetail from './ManifestDetail'
import DetailToggle from '../shared/DetailToggle'
import Collapse from '../shared/Collapse'
import Tooltip from '../shared/Tooltip'

function ManifestDetailActions({ manifest }: ManifestDetailActionsProps) {
	const { getText } = useI18nContext()
	const [listOpen, setListOpen] = useState(false)

	if(!manifest.actions?.length) return null

	const hasAi = manifest.actions.some(action => isIptcDigitalSourceTypeAi(action.iptc))

	return (
		<ManifestDetail
			title={getText('actions')}
			titleIcon="actions"
			titleTooltip={getText('actions', 'definition')}
			className={classNames('ManifestDetailActions')}
		>
			<DetailToggle
				open={listOpen}
				value={getText('actions', hasAi ? 'ai' : 'human')}
				subtitle={getText('actions', 'list', listOpen ? 'hide' : 'show')}
				onToggle={() => setListOpen(!listOpen)}
			/>
			<Collapse
				open={listOpen}
			>
				<ul
					className={classNames('ManifestDetailActionsList')}
				>
					{manifest.actions.map((action, index) =>
						<li
							key={index}
							className={classNames('ManifestDetailActionsListItem')}
						>
							<Tooltip
								content={getText('action', action.key, 'definition')}
							>
								<span>
									{getText('action', action.key)}
								</span>
							</Tooltip>
							{isIptcDigitalSourceTypeAi(action.iptc) ?
								<span>
									{getText('action', 'ai')}
								</span>
							: null}
						</li>
					)}
				</ul>
			</Collapse>
		</ManifestDetail>
	)
}

export default ManifestDetailActions
