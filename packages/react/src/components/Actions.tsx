import type { ActionsProps } from 'syw-common/types/components'
import { useI18nContext } from '$src/context/i18n'
import { classNames } from 'syw-common/helpers'
import Tooltip from './Tooltip'
import Icon from './Icon'
import { isIptcDigitalSourceTypeAi } from 'syw-common/helpers/iptc'

const Actions = ({
	actions
}: ActionsProps) => {
	const { getText } = useI18nContext()
	return (
		<div
			className={classNames('Actions')}
		>
			<ul
				className={classNames('ActionsList')}
			>
				{actions.map((action, index) =>
					<li
						key={index}
						className={classNames('ActionsListItem')}
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
							content={getText("action", action.key, "definition")}
						>
							<Icon
								type="info"
								className={classNames('ActionsListItemTooltipIcon')}
							/>
						</Tooltip>
					</li>
				)}
			</ul>
		</div>
	)
}

export default Actions