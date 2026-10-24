import { useMemo } from 'react'
import { Tabs } from '@ark-ui/react/tabs'
import { classNames, getAvailableTabs } from 'syw-common/helpers/ui'
import type { ManifestContentTabsToggleProps } from 'syw-common/types/components'
import { useI18nContext } from '$src/context'
import Icon from '$src/components/shared/Icon'

function ManifestContentTabsToggle({
	manifest,
	keys,
	className
}: ManifestContentTabsToggleProps) {
	const { getText } = useI18nContext()

	const availableTabs = useMemo(() =>
		getAvailableTabs(keys, manifest)
	, [keys, manifest])

	return (
		<div
			className={classNames(
				'ManifestContentTabsToggle',
				className
			)}
		>
			<Tabs.List
				className={classNames('ManifestContentTabsToggleList')}
			>
				{keys?.map((key) => (
					<Tabs.Trigger
						key={key}
						value={key}
						disabled={!availableTabs?.includes(key)}
						className={classNames('ManifestContentTabsToggleTrigger')}
					>
						<Icon
							type={`tab_${key}`}
							className={classNames('ManifestContentTabsToggleTriggerIcon')}
						/>
						<span>
							{getText("tab", key)}
						</span>
					</Tabs.Trigger>
				))}
				<Tabs.Indicator
					className={classNames('ManifestContentTabsToggleListIndicator')}
				/>
			</Tabs.List>
		</div>
	)
}

export default ManifestContentTabsToggle