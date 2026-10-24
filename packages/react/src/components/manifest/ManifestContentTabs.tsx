import { useMemo } from 'react'
import { Tabs } from '@ark-ui/react/tabs'
import { classNames, getAvailableTabs } from 'syw-common/helpers/ui'
import type { ManifestContentTabsProps } from 'syw-common/types/components'
import ManifestInfo from '$src/components/manifest/ManifestInfo'
import ManifestImage from '$src/components/manifest/ManifestImage'

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
							<ManifestInfo
								manifest={manifest}
							/>
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
