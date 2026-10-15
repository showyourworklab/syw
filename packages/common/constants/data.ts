import type { SywData, ManifestTypeKey } from '#types/data'

export const MANIFEST_TYPES = {
	CAMERA: 'camera',
	EDIT: 'edit',
	AI_CREATE: 'ai_create',
	AI_EDIT: 'ai_edit',
	UNKNOWN: 'unknown',
	UNKNOWN_CREATE: 'unknown_create',
} as const
// Exact, case-sensitive claim_generator_info[].name or signature_info.common_name values
export const KNOWN_GENERATORS_BY_MANIFEST_TYPE: Record<string, ManifestTypeKey> = {
	// CAMERA
	"LEICA M11-P": MANIFEST_TYPES.CAMERA,
	"LEICA SL3-S": MANIFEST_TYPES.CAMERA,
	// EDIT
	"Adobe Photoshop": MANIFEST_TYPES.EDIT,
	"Lightroom": MANIFEST_TYPES.EDIT,
	"Lightroom Classic": MANIFEST_TYPES.EDIT,
	"Photo Mechanic": MANIFEST_TYPES.EDIT,
	// AI
	"Adobe Firefly": MANIFEST_TYPES.AI_CREATE,
}
export const PHASE_KEYS = {
	IDLE: 'idle',
	LOADING: 'loading',
	READY: 'ready',
	ERROR: 'error',
} as const
export const TRUST_KEYS = {
	VALIDATING: 'validating',
	UNKNOWN: 'unknown',
	TRUSTED: 'trusted',
	TRUSTED_LEGACY: 'trusted_legacy',
	VALID: 'valid',
	INVALID: 'invalid',
	// For manifests added by SYW with nothing to validate, like unknown create
	NONE: 'none',
} as const
export const MEDIA_TYPES = {
	IMAGE: 'image',
	VIDEO: 'video',
	UNKNOWN: 'unknown',
} as const
export const MEDIA_TYPE_EXTENSIONS_IMAGE: readonly string[] = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif', 'heic', 'heif', 'tif', 'tiff', 'svg', 'bmp']
export const MEDIA_TYPE_EXTENSIONS_VIDEO: readonly string[] = ['mp4', 'm4v', 'mov', 'webm', 'ogv', 'avi', 'mkv']
export const C2PA_DATA_DEFAULT: SywData = {
	phase: PHASE_KEYS.IDLE,
	trust: TRUST_KEYS.VALIDATING,
	types: [],
	manifests: [],
	mediaType: MEDIA_TYPES.UNKNOWN,
	provenance: null,
	reader: null,
	error: null,
}