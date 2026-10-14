import c2paWebPackage from '@contentauth/c2pa-web/package.json' with { type: 'json' }

// Read from the installed package so the WASM always matches c2pa-web's integrity check
export const C2PA_WEB_VERSION = c2paWebPackage.version
export const C2PA_WEB_WASM_CDN_URL = `https://cdn.jsdelivr.net/npm/@contentauth/c2pa-web@${C2PA_WEB_VERSION}/dist/resources/c2pa_bg.wasm`
export const C2PA_CREATED_IPTC = [
	"http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia"
]
export const C2PA_ACTIONS = {
	CREATED: 'c2pa.created',
	OPENED: 'c2pa.opened',
} as const
export const C2PA_INGREDIENT_RELATIONSHIPS = {
	PARENT_OF: 'parentOf',
} as const
