import type { C2paOptions, KnownMediaType } from './c2pa.js'
import type { MapOptions, UiEventHandler, Variant } from './ui.js'

export interface SywEmbedProps {
	locale?: string
	src: string
	alt?: string
	caption?: string
	byline?: string
	mediaType?: KnownMediaType
	variant?: Variant | string
	c2paOptions?: C2paOptions
	mapOptions?: MapOptions
	onEvent?: UiEventHandler
}
