import { C2PA_WEB_VERSION } from './c2pa-version.js'

// Generated from the installed package so the WASM always matches c2pa-web's integrity check
export { C2PA_WEB_VERSION }
export const C2PA_WEB_WASM_CDN_URL = `https://cdn.jsdelivr.net/npm/@contentauth/c2pa-web@${C2PA_WEB_VERSION}/dist/resources/c2pa_bg.wasm`
export const C2PA_CREATED_IPTC = [
	"http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia"
]
export const C2PA_ACTIONS = {
	CREATED: 'c2pa.created',
	OPENED: 'c2pa.opened',
	PUBLISHED: 'c2pa.published',
	REDACTED: 'c2pa.redacted',
	WATERMARKED: 'c2pa.watermarked',
	EDITED_METADATA: 'c2pa.edited.metadata',
	TRANSCODED: 'c2pa.transcoded',
	REPACKAGED: 'c2pa.repackaged',
	RESIZED: 'c2pa.resized',
} as const
export const C2PA_INGREDIENT_RELATIONSHIPS = {
	PARENT_OF: 'parentOf',
} as const
