import { useCallback, useEffect, useMemo, useState } from 'react'
import type { RefObject } from 'react'
import { Tabs, useTabs } from '@ark-ui/react/tabs'
import { classNames, getAvailableTabs } from 'syw-common/helpers/ui'
import { MANIFEST_CONTENT_TAB_KEYS } from 'syw-common/constants/ui'
import type { Manifest as ManifestData } from 'syw-common/types/data'
import { useUiContext } from '$src/context/ui'
import Collapse from '$src/components/shared/Collapse'
import ManifestPreview from '$src/components/manifest/ManifestPreview'
import ManifestContent from '$src/components/manifest/ManifestContent'

interface ManifestProps {
	manifest: ManifestData
	previewRef: RefObject<HTMLDivElement> | null
}

function Manifest({
	manifest,
	previewRef
}: ManifestProps) {
	const [open, setOpen] = useState(false)
	const { isProvenanceOpen, openManifests, openManifest, closeManifest } = useUiContext()

	const tabKeys = useMemo(() =>
		(manifest?.type?.key
			? MANIFEST_CONTENT_TAB_KEYS[manifest.type.key]
			: undefined
		) ?? []
	, [manifest])

	const availableTabKeys = useMemo(() =>
		getAvailableTabs(tabKeys, manifest)
	, [tabKeys, manifest])

	const tabs = useTabs({
		defaultValue: availableTabKeys?.[0]
	})

	const className = useMemo(() =>
		classNames(
			'Manifest',
			open ? 'Manifest_open' : null
		)
	, [open])

	// Handle click of manifest preview / header
	const handleToggle = useCallback((event?: unknown) => {
		setOpen(!open)
		if(open) {
			closeManifest(event, manifest)
		} else {
			openManifest(event, manifest)
		}
	}, [open, manifest, openManifest, closeManifest, openManifests])

	// Close manifest when provenance is closed
	useEffect(() => {
		if(!isProvenanceOpen) setOpen(false)
	}, [isProvenanceOpen])

	// Select the first available tab when the selected one isn't available, like after the source changes
	useEffect(() => {
		const firstTabKey = availableTabKeys[0]
		if(firstTabKey && !availableTabKeys.includes(tabs.value ?? '')) tabs.setValue(firstTabKey)
	}, [availableTabKeys])

	return (
		<div
			className={className}
		>
			<div
				className={
					classNames('ManifestInner')
				}
			>
				<Tabs.RootProvider
					value={tabs}
				>
					<ManifestPreview
						open={open}
						manifest={manifest}
						tabKeys={tabKeys}
						onToggle={handleToggle}
						previewRef={previewRef}
					/>
					<Collapse
						open={open && isProvenanceOpen}
					>
						<ManifestContent
							manifest={manifest}
							tabKeys={tabKeys}
						/>
					</Collapse>
				</Tabs.RootProvider>
			</div>
		</div>
	)
}

export default Manifest