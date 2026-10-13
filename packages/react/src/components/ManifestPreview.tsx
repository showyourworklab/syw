import type { KeyboardEvent, RefObject } from 'react'
import { MANIFEST_PREVIEW_TITLE_KEYS } from 'syw-common/constants'
import { handleA11yClick, classNames } from 'syw-common/helpers'
import { getDateString } from 'syw-common/helpers/i18n'
import type { ManifestPreviewProps } from 'syw-common/types/components'
import { useI18nContext } from '$src/context/i18n'
import Badge from '$src/components/Badge'
import Icon from '$src/components/Icon'
import ManifestContentTabsToggle from './ManifestContentTabsToggle'

interface ReactManifestPreviewProps extends ManifestPreviewProps {
	previewRef: RefObject<HTMLDivElement> | null
}

function ManifestPreview({
	open,
	manifest,
	tabKeys,
	onToggle,
	previewRef
}: ReactManifestPreviewProps) {
	const { locale, getText } = useI18nContext()
	const thumbnailUrl = manifest?.thumbnail

	const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		handleA11yClick(event, onToggle)
	}

	return (
		<div
			className={classNames('ManifestPreview')}
		>
			<div
				ref={previewRef}
				role='button'
				tabIndex={0}
				aria-pressed={open}
				className={classNames('ManifestPreviewToggle')}
				onClick={onToggle}
				onKeyDown={onKeyDown}
			>
				<div
					className={classNames('ManifestPreviewBadge')}
				>
					<Badge
						type={manifest.type}
					/>
				</div>
				<div
					className={classNames('ManifestPreviewCells')}
				>
					<div
						className={classNames(
							'ManifestPreviewCell',
							'ManifestPreviewCell_issuer'
						)}
					>
						{manifest.type?.key
							? getText("type", manifest.type?.key)
							: MANIFEST_PREVIEW_TITLE_KEYS.filter(key => manifest[key]).map(key =>
								manifest[key]
							).join(" ")
						}
					</div>
					<div
						className={classNames(
							'ManifestPreviewCell',
							'ManifestPreviewCell_time'
						)}
					>
						<span>{getDateString(locale, manifest?.timestamp ?? undefined)}</span>
					</div>
					<div
						className={classNames(
							'ManifestPreviewCell',
							'ManifestPreviewCell_thumb',
						)}
					>
						{thumbnailUrl ?
							<img
								src={thumbnailUrl}
								alt=''
							/>
						: <Icon type="missing" />}
					</div>
				</div>
			</div>
			<ManifestContentTabsToggle
				keys={tabKeys}
				manifest={manifest}
				className={classNames('ManifestPreviewTabsToggle')}
			/>
		</div>
	)
}

export default ManifestPreview