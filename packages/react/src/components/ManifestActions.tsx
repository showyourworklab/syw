import { useState } from 'react'
import { classNames } from 'syw-common/helpers/ui'
import { isIptcDigitalSourceTypeAi } from 'syw-common/helpers/iptc'
import type { ManifestActionsProps } from 'syw-common/types/components'
import { useI18nContext } from '$src/context'
import Detail from './Detail'
import DetailToggle from './DetailToggle'
import Collapse from './Collapse'
import Tooltip from './Tooltip'
import Icon from './Icon'

function ManifestActions({ manifest }: ManifestActionsProps) {
	const { getText } = useI18nContext()
	const [listOpen, setListOpen] = useState(false)

	if(!manifest.actions?.length) return null

	const hasAi = manifest.actions.some(action => isIptcDigitalSourceTypeAi(action.iptc))

	return (
		<Detail
			title={getText('actions')}
			titleTooltip={getText('actions', 'definition')}
			className={classNames('ManifestActions')}
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
					className={classNames('ManifestActionsList')}
				>
					{manifest.actions.map((action, index) =>
						<li
							key={index}
							className={classNames('ManifestActionsListItem')}
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
									className={classNames('ManifestActionsListItemTooltipIcon')}
								/>
							</Tooltip>
						</li>
					)}
				</ul>
			</Collapse>
		</Detail>
	)
}

export default ManifestActions
