import type { VARIANT_KEYS, SYW_ICONS } from '#constants/ui'
import type { TrustKey, Manifest, ManifestTypeKey } from './data.js'

export type Variant = typeof VARIANT_KEYS[number]

export type MapOptions = Record<string, unknown> | null

export type SywIconNode = [
	elementName: 'circle' | 'ellipse' | 'g' | 'line' | 'path' | 'polygon' | 'polyline' | 'rect',
	attrs: Record<string, string>
][]

export type SywIconType = keyof typeof SYW_ICONS

// Icons shown next to Detail titles, keyed by the detail they label
export type ManifestDetailIconKey = 'timestamp' | 'producer' | 'signator' | 'location' | 'actions' | 'identity'

// Icons shown next to ManifestSection titles
export type ManifestSectionIconKey = 'section_identity' | 'section_primary' | 'section_trust'

// Icons shown in the manifest content tab triggers
export type ManifestTabIconKey = 'tab_info' | 'tab_image'

export type LucideIconType = TrustKey | ManifestTypeKey | ManifestDetailIconKey | ManifestSectionIconKey | ManifestTabIconKey | 'unknown_type' | 'missing' | 'up' | 'down' | 'close' | 'info'

export type IconType = LucideIconType | SywIconType

export interface UiState {
	variant: Variant | string
	elem: HTMLElement | null
	mapOptions: MapOptions
	isHoverImage: boolean
	isProvenanceOpen: boolean
	isExplainerOpen: boolean
	openManifests: Record<string, Manifest>
}

export type UiEventType =
	| 'image.hover'
	| 'image.unhover'
	| 'provenance.open'
	| 'provenance.close'
	| 'explainer.open'
	| 'explainer.close'
	| 'manifest.open'
	| 'manifest.close'

export type UiEventHandler = (type: UiEventType | string, event: unknown, ...args: unknown[]) => void