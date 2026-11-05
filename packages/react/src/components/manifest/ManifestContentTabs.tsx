import { useMemo } from 'react'
import { Tabs } from '@ark-ui/react/tabs'
import { classNames, getAvailableTabs } from 'syw-common/helpers/ui'
import type { ManifestContentTabsProps } from 'syw-common/types/components'
import ManifestInfo from '$src/components/manifest/ManifestInfo'
import ManifestImage from '$src/components/manifest/ManifestImage'
import ManifestDetailDefinition from '$src/components/manifest/ManifestDetailDefinition'
import { useI18nContext, useDataContext } from '$src/context'

function ManifestContentTabs({
	manifest,
	keys
}: ManifestContentTabsProps) {
	const { getText } = useI18nContext()
	const { mediaType } = useDataContext()

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
							<div
								className={classNames('ManifestContentTabsImage')}
							>
								<ManifestImage
									manifest={manifest}
								/>
								{manifest.thumbnail ?
									<ManifestDetailDefinition>
										{getText('thumbnail', 'definition', mediaType)}
									</ManifestDetailDefinition>
								: null}
							</div>
						: null}
					</div>
				</Tabs.Content>
			))}
		</div>
	)
}

export default ManifestContentTabs
