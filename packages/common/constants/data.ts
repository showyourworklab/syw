import type { SywData, ManifestTypeKey } from '#types/data'

export const MANIFEST_TYPES = {
	CAMERA: 'camera',
	EDIT: 'edit',
	AI_CREATE: 'ai_create',
	AI_EDIT: 'ai_edit',
	UNKNOWN: 'unknown',
	UNKNOWN_CREATE: 'unknown_create',
	// Recorded steps whose integrity isn't valid, so their own claims aren't shown
	NONE: 'none',
} as const
// Exact, case-sensitive claim_generator_info[].name, signature_info.common_name or signature_info.issuer values
export const KNOWN_GENERATORS_BY_MANIFEST_TYPE: Record<string, ManifestTypeKey> = {
	// CAMERA
	"LEICA M11-P": MANIFEST_TYPES.CAMERA,
	"LEICA SL3-S": MANIFEST_TYPES.CAMERA,
	"NIKON CORPORATION": MANIFEST_TYPES.CAMERA,
	"Canon EOS R5m2": MANIFEST_TYPES.CAMERA,
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
// Whether a manifest's details still match what was signed
export const INTEGRITY_KEYS = {
	VALID: 'valid',
	INVALID: 'invalid',
	// Validation returned no results for the manifest
	UNAVAILABLE: 'unavailable',
} as const
// Whether a manifest's signer or identity is on a trust list
export const TRUST_KEYS = {
	TRUSTED: 'trusted',
	TRUSTED_LEGACY: 'trusted_legacy',
	UNTRUSTED: 'untrusted',
	// Signing certificate has expired, without a trusted time-stamp showing it was valid when signed
	UNTRUSTED_EXPIRED: 'untrusted_expired',
} as const
// How far a manifest detail can be trusted
export const DETAIL_TRUST_KEYS = {
	...TRUST_KEYS,
	// Gathered by the signer from a person or another app, without being checked
	REPORTED: 'reported',
} as const
// Detail trust keys from most to least trusted
export const DETAIL_TRUST_ORDER = [
	DETAIL_TRUST_KEYS.TRUSTED,
	DETAIL_TRUST_KEYS.TRUSTED_LEGACY,
	DETAIL_TRUST_KEYS.UNTRUSTED,
	DETAIL_TRUST_KEYS.UNTRUSTED_EXPIRED,
	DETAIL_TRUST_KEYS.REPORTED,
] as const
// What a manifest detail's trust comes from
export const DETAIL_TRUST_SOURCES = {
	// A time-stamp authority's certificate
	TIMESTAMP: 'timestamp',
	// A CAWG identity's certificate
	IDENTITY: 'identity',
	// The claim signer, for the claim and the assertions attributed to it
	SIGNER: 'signer',
	// Gathered by the signer, for assertions not attributed to it
	GATHERED: 'gathered',
} as const
export const MEDIA_TYPES = {
	IMAGE: 'image',
	VIDEO: 'video',
} as const
export const MEDIA_TYPE_EXTENSIONS_IMAGE: readonly string[] = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif', 'heic', 'heif', 'tif', 'tiff', 'svg', 'bmp']
export const MEDIA_TYPE_EXTENSIONS_VIDEO: readonly string[] = ['mp4', 'm4v', 'mov', 'webm', 'ogv', 'avi', 'mkv']
export const C2PA_DATA_DEFAULT: SywData = {
	phase: PHASE_KEYS.IDLE,
	types: [],
	manifests: [],
	mediaType: MEDIA_TYPES.IMAGE,
	provenance: null,
	reader: null,
	error: null,
}