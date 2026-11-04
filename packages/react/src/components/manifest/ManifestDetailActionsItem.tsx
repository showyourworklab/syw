import { useState } from 'react'
import { classNames } from 'syw-common/helpers/ui'
import { isIptcDigitalSourceTypeAi } from 'syw-common/helpers/iptc'
import type { ManifestDetailActionsItemProps } from 'syw-common/types/components'
import { useI18nContext } from '$src/context'
import Collapse from '$src/components/shared/Collapse'
import Icon from '$src/components/shared/Icon'

function ManifestDetailActionsItem({ action }: ManifestDetailActionsItemProps) {
	const { getText } = useI18nContext()
	const [open, setOpen] = useState(false)

	return (
		<li
			className={classNames(
				'ManifestDetailActionsItem',
				open ? 'ManifestDetailActionsItem_open' : null,
			)}
		>
			<button
				type="button"
				aria-expanded={open}
				className={classNames('ManifestDetailActionsItemToggle')}
				onClick={() => setOpen(!open)}
			>
				<span>
					{getText('action', action.key)}
				</span>
				<Icon
					type={open ? 'up' : 'down'}
					className={classNames('ManifestDetailActionsItemToggleIcon')}
				/>
			</button>
			{isIptcDigitalSourceTypeAi(action.iptc) ?
				<span
					className={classNames('ManifestDetailActionsItemAi')}
				>
					{getText('action', 'ai')}
				</span>
			: null}
			<Collapse
				open={open}
			>
				<p
					className={classNames('ManifestDetailActionsItemDefinition')}
				>
					{getText('action', action.key, 'definition')}
				</p>
			</Collapse>
		</li>
	)
}

export default ManifestDetailActionsItem
