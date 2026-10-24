import { useState } from 'react'
import { classNames } from 'syw-common/helpers/ui'
import { isIptcDigitalSourceTypeAi } from 'syw-common/helpers/iptc'
import type { ManifestDetailActionsProps } from 'syw-common/types/components'
import { useI18nContext } from '$src/context'
import Detail from '../shared/Detail'
import DetailToggle from '../shared/DetailToggle'
import Collapse from '../shared/Collapse'
import Tooltip from '../shared/Tooltip'
import Icon from '../shared/Icon'

function ManifestDetailActions({ manifest }: ManifestDetailActionsProps) {
	const { getText } = useI18nContext()
	const [listOpen, setListOpen] = useState(false)

	if(!manifest.actions?.length) return null

	const hasAi = manifest.actions.some(action => isIptcDigitalSourceTypeAi(action.iptc))

	return (
		<Detail
			title={getText('actions')}
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
							<span>
								{getText('action', action.key)}
							</span>
							{isIptcDigitalSourceTypeAi(action.iptc) ?
								<span>
									{getText('action', 'ai')}
								</span>
							: null}
							<Tooltip
								content={getText('action', action.key, 'definition')}
							>
								<Icon
									type="info"
									className={classNames('ManifestDetailActionsListItemTooltipIcon')}
								/>
							</Tooltip>
						</li>
					)}
				</ul>
			</Collapse>
		</Detail>
	)
}

export default ManifestDetailActions
