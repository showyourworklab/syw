import type { DetailTrust, Manifest, ManifestAction, ManifestFieldKey, ManifestLocationValue, ManifestType } from './data.js'
import type { IconType } from './ui.js'

// Views of a manifest's content, toggled by tabs
export type ManifestContentTabKey = 'info' | 'image'

export interface ComponentProps {
	className?: string | null
	children?: any
}

export interface BadgeProps extends ComponentProps {
	type?: ManifestType | null
}

export interface ManifestDetailProps extends ComponentProps {
	// Controls whether it's open, otherwise the detail keeps its own state
	open?: boolean
	// Makes the detail toggleable, with its value up front and its trust and children shown when open
	title?: string | null
	titleIcon?: IconType | null
	// A string or rendered content, like the generator's entries
	value?: any
	// Hint below the value, like "Click to show map"
	prompt?: string | null
	// How far the value can be trusted, stated below the children when open
	trust?: DetailTrust | null
	// Called on toggle, alongside open to control it from outside
	onToggle?: () => void
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

export interface ProvenanceExplainerToggleProps extends ComponentProps {}

export interface IconProps extends ComponentProps {
	type: IconType | null | undefined
	// Accessible name, for icons that carry meaning on their own
	label?: string | null
	size?: number
	strokeWidth?: number
}

export interface MapProps extends ComponentProps {
	location: ManifestLocationValue
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

export interface ManifestEmptyProps extends ComponentProps {
	manifest: Manifest
}

export interface ManifestInfoProps extends ComponentProps {
	manifest: Manifest
}

export interface ManifestImageProps extends ComponentProps {
	manifest: Manifest
}

export interface ManifestDetailLocationProps extends ComponentProps {
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
	titleIcon?: IconType | null
	definition?: string | null
}

export interface ManifestDetailActionsProps extends ComponentProps {
	manifest: Manifest
}

export interface ManifestDetailHeaderProps extends Pick<ManifestDetailProps, 'open' | 'title' | 'titleIcon' | 'value' | 'onToggle'>, ComponentProps {}

export interface ManifestDetailNoteProps extends ComponentProps {
	icon: IconType
}

export interface ManifestDetailActionsItemProps extends ComponentProps {
	action: ManifestAction
}

export interface ManifestDetailGeneratorProps extends ComponentProps {
	manifest: Manifest
}

export interface ManifestSectionIdentityProps extends ComponentProps {
	manifest: Manifest
}

export interface ManifestSectionPrimaryProps extends ComponentProps {
	keys: readonly ManifestFieldKey[]
	manifest: Manifest
}

export interface ManifestDetailPrimaryProps extends ComponentProps {
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

export interface ManifestSectionTrustProps extends ComponentProps {
	manifest: Manifest
}

export interface LoaderProps extends ComponentProps {
	loading?: boolean
}