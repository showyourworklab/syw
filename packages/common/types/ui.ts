import type { VARIANT_KEYS } from '#constants/index'
import type { SYW_ICONS } from '#constants/ui'
import type { C2paTrustValue, Manifest, ManifestThumbnail, ManifestTypeKey } from './c2pa.js'

export type Variant = typeof VARIANT_KEYS[number]

export type MapOptions = Record<string, unknown> | null

export type SywIconNode = [
	elementName: 'circle' | 'ellipse' | 'g' | 'line' | 'path' | 'polygon' | 'polyline' | 'rect',
	attrs: Record<string, string>
][]

export type SywIconType = keyof typeof SYW_ICONS

export type LucideIconType = C2paTrustValue | ManifestTypeKey | 'origin' | 'missing' | 'up' | 'down' | 'close' | 'info'

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