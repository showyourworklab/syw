import type { TrustKey, Manifest, ManifestFieldKey, ManifestLocation, ManifestType } from './data.js'
import type { IconType } from './ui.js'

// Views of a manifest's content, toggled by tabs
export type ManifestContentTabKey = 'info' | 'image'

export interface ComponentProps {
	className?: string | null
	children?: any
}

export interface BadgeProps extends ComponentProps {
	type?: ManifestType | null
	status?: TrustKey
}

export interface DetailProps extends ComponentProps {
	title?: string | null
	titleTooltip?: string | null
	titleIcon?: IconType | null
	noBackground?: boolean
	footer?: string | null
}

export interface DetailToggleProps extends ComponentProps {
	open: boolean
	value: string | null
	subtitle?: string | null
	onToggle: () => void
}

export interface CollapseProps extends ComponentProps {
	open?: boolean
}

export interface PopoverProps extends ComponentProps {
	open?: boolean
	positioning?: any
	title?: string | null
	description?: string | null
	onOpenChange: (open: boolean) => void
}

export type DrawerDirection = 'bottom' | 'left' | 'right'

export interface DrawerProps extends ComponentProps {
	open?: boolean
	title?: string | null
	description?: string | null
	direction?: DrawerDirection
	onOpenChange: (open: boolean) => void
}

export interface ProvenanceDrawerProps {
	direction?: DrawerDirection
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
	tabKeys: readonly ManifestContentTabKey[]
	manifest: Manifest
}

export interface ManifestContentTabsProps extends ComponentProps {
	manifest: Manifest
	keys: readonly ManifestContentTabKey[]
}

export interface ManifestContentTabsToggleProps extends ComponentProps {
	manifest: Manifest
	keys: readonly ManifestContentTabKey[]
}

export interface ManifestInfoProps extends ComponentProps {
	manifest: Manifest
}

export interface ManifestImageProps extends ComponentProps {
	manifest: Manifest
}

export interface ManifestLocationProps extends ComponentProps {
	manifest: Manifest
}

export interface ManifestPreviewProps extends ComponentProps {
	open: boolean
	manifest: Manifest
	tabKeys: readonly ManifestContentTabKey[]
	onToggle: (event?: unknown) => void
}

export interface ManifestSectionProps extends ComponentProps {
	title?: string | null
	definition?: string | null
}

export interface ManifestActionsProps extends ComponentProps {
	manifest: Manifest
}

export interface ManifestIdentityProps extends ComponentProps {
	manifest: Manifest
}

export interface ManifestPrimaryProps extends ComponentProps {
	keys: readonly ManifestFieldKey[]
	manifest: Manifest
}

export interface ManifestPrimaryFieldProps extends ComponentProps {
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

export interface ManifestTrustProps extends ComponentProps {
	manifest: Manifest
}

export interface TypeBadgeProps extends ComponentProps {
	value: ManifestType | null | undefined
}