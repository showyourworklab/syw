import { useMemo } from 'react'
import { Tabs } from '@ark-ui/react/tabs'
import { classNames, getAvailableTabs } from 'syw-common/helpers/ui'
import { MANIFEST_PRIMARY_KEYS } from 'syw-common/constants/ui'
import type { ManifestContentTabsProps } from 'syw-common/types/components'
import ManifestIdentity from './ManifestIdentity'
import ManifestTable from './ManifestTable'
import ManifestTrust from './ManifestTrust'
import ManifestLocation from './ManifestLocation'
import ManifestImage from './ManifestImage'

function ManifestContentTabs({
	manifest,
	keys
}: ManifestContentTabsProps) {
	const availableTabs = useMemo(() =>
		getAvailableTabs(keys, manifest)
	, [keys, manifest])

	return (
		<div
			className={classNames('ManifestContentTabs')}
		>
			{availableTabs?.map((key) => (
				<Tabs.Content
					key={key}
					value={key}
					className={classNames(
						'ManifestContentTabsContent',
						`ManifestContentTabsContent_${key}`
					)}
				>
					<div
						className={classNames('ManifestContentTabsContentInner')}
					>
						{key === "info" ?
							<>
								<div
									className={classNames('ManifestContentTabsColumn', 'ManifestContentTabsColumn_primary')}
								>
									<ManifestTable
										keys={MANIFEST_PRIMARY_KEYS}
										manifest={manifest}
									/>
									<ManifestLocation
										manifest={manifest}
									/>
								</div>
								<div
									className={classNames('ManifestContentTabsColumn', 'ManifestContentTabsColumn_secondary')}
								>
									<ManifestIdentity
										manifest={manifest}
									/>
									<ManifestTrust
										manifest={manifest}
									/>
								</div>
							</>
						: key === "image" ?
							<ManifestImage
								manifest={manifest}
							/>
						: null}
					</div>
				</Tabs.Content>
			))}
		</div>
	)
}

export default ManifestContentTabs
