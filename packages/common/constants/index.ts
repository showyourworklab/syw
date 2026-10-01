import { ManifestTypeKey } from "#types/c2pa"

// export const VERIFY_BASE_URL = 'originverify.iptc.org'
export const VERIFY_BASE_URL = 'verify.contentauthenticity.org'
//////////////// Variants ///////////////
export const VARIANT_KEYS = [
	'expand',
	'modal',
	'drawer-bottom',
	'drawer-left',
	'drawer-right',
]
export const VARIANT_DEFAULT = 'expand'
// export const VARIANT_DEFAULT = 'drawer-right'

/////////////// Manifests //////////////
export const MANIFEST_KEYS = [
	'timestamp',
	'producer',
	'generator',
	'signator',
	'actions',
	// 'ingredients',
	// 'verify',
	'location',
] as const
export const MANIFEST_PRIMARY_KEYS = [
	'timestamp',
	'producer',
	'generator',
	'signator',
] as const
export const MANIFEST_SECONDARY_KEYS = [
	'location',
	// 'actions',
	'thumbnail'
] as const
export const MANIFEST_PREVIEW_TITLE_KEYS = [
	'generator',
	'signator',
] as const
export const MANIFEST_CONTENT_TAB_KEYS = {
	camera: ['thumbnail', 'location'],
	edit: ['thumbnail', 'actions'],
	ai: ['thumbnail', 'actions'],
	unknown: []
} as const
export const MANIFEST_CONTENT_TAB_DEFAULT = 'thumbnail'
/////////////// Types //////////////
export const SIGNATURE_COMMON_NAME_CAMERA = [
	'LEICA M11-P',
	'LEICA SL3-S',
	'Proofmode for Android',
]
export const SIGNATURE_COMMON_NAME_EDIT = [
	'Adobe Photoshop',
	'Adobe Lightroom',
	'Adobe Lightroom Classic',
]
export const SIGNATURE_COMMON_NAME_BY_TYPE: Partial<Record<ManifestTypeKey, string[]>> = {
	camera: SIGNATURE_COMMON_NAME_CAMERA,
	edit: SIGNATURE_COMMON_NAME_EDIT,
}
///////////////// Icons ////////////////
export const ICON_DEFAULT_SIZE = 24
export const ICON_DEFAULT_STROKE_WIDTH = 2