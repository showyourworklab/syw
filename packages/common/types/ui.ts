import type { VARIANT_KEYS, SYW_ICONS, MEDIA_QUERIES } from '#constants/ui'
import type { IntegrityKey, TrustKey, DetailTrustKey, Manifest, ManifestTypeKey, SywMediaData } from './data.js'

export type Variant = typeof VARIANT_KEYS[number]

export type MapOptions = Record<string, unknown> | null

// Attributes for the <img> element, typed per framework (SywImageAttrs in react and svelte)
export type ImageAttrs = Record<string, unknown>

export type MediaQueryKey = keyof typeof MEDIA_QUERIES

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

export type LucideIconType = IntegrityKey | TrustKey | DetailTrustKey | ManifestTypeKey | ManifestDetailIconKey | ManifestSectionIconKey | ManifestTabIconKey | 'missing' | 'up' | 'down' | 'close' | 'info' | 'external'

export type IconType = LucideIconType | SywIconType

export interface UiState<TImageAttrs = ImageAttrs> {
	variant: Variant | string
	elem: HTMLElement | null
	mapOptions: MapOptions
	imageAttrs: TImageAttrs
	isProvenanceOpen: boolean
	isExplainerOpen: boolean
	openManifests: Record<string, Manifest>
}

export type UiEventType =
	| 'provenance.open'
	| 'provenance.close'
	| 'explainer.open'
	| 'explainer.close'
	| 'manifest.open'
	| 'manifest.close'
	| C2paEventType

// Fired when reading the media's C2PA data starts and when it finishes, with the media data as data
export type C2paEventType =
	| 'c2pa.load'
	| 'c2pa.ready'
	| 'c2pa.empty'
	| 'c2pa.error'

// The manifest for manifest.* events, the media data for c2pa.* events, otherwise undefined
export type UiEventData = Manifest | SywMediaData | undefined

// event is the DOM event behind an open or close, and null for c2pa.* events
export type UiEventHandler = (type: UiEventType | string, event: Event | null | undefined, data?: UiEventData) => void