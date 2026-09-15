import type { C2paStatus, Manifest, ManifestActions, ManifestFieldKey, ManifestLocation, ManifestType } from './c2pa.js'
import type { IconType } from './ui.js'

export interface ComponentProps {
	className?: string | null
	children?: any
}

export interface ActionsProps extends ComponentProps {
	actions: ManifestActions
}

export interface BadgeProps extends ComponentProps {
	type?: ManifestType | null
	status?: C2paStatus
}

export interface CollapseProps extends ComponentProps {
	open?: boolean
}

export interface ExplainerToggleProps extends ComponentProps {}

export interface IconProps extends ComponentProps {
	type: IconType | null | undefined
	size?: number
	strokeWidth?: number
}

export interface MapProps extends ComponentProps {
	location: ManifestLocation
}

export interface ManifestContentProps extends ComponentProps {
	tabKeys: readonly ManifestFieldKey[]
	manifest: Manifest
}

export interface ManifestContentTabsProps extends ComponentProps {
	manifest: Manifest
	keys: readonly ManifestFieldKey[]
}

export interface ManifestContentTabsToggleProps extends ComponentProps {
	manifest: Manifest
	keys: readonly ManifestFieldKey[]
}

export interface ManifestPreviewProps extends ComponentProps {
	open: boolean
	manifest: Manifest
	tabKeys: readonly ManifestFieldKey[]
	onToggle: (event?: unknown) => void
}

export interface ManifestTableProps extends ComponentProps {
	keys: readonly ManifestFieldKey[]
	manifest: Manifest
}

export interface ManifestTableRowProps extends ComponentProps {
	type: ManifestFieldKey
	manifest: Manifest
}

export interface MarkdownProps extends ComponentProps {
	content: string | null | undefined
	tag?: string
}

export interface ModalProps extends ComponentProps {
	open?: boolean
	title?: string | null
	description?: string | null
	onOpenChange: (open: boolean) => void
}

export interface StatusBadgeProps extends ComponentProps {
	value: C2paStatus
}

export interface TypeBadgeProps extends ComponentProps {
	value: ManifestType | null | undefined
	status?: C2paStatus
}