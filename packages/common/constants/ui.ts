import type { SywIconNode } from '#types/ui'

export const VERIFY_BASE_URL = 'originverify.iptc.org'
// export const VERIFY_BASE_URL = 'verify.contentauthenticity.org'
//////////////// Variants ///////////////
export const VARIANT_KEYS = [
	'expand',
	'modal',
	'popover',
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
	ai_create: ['thumbnail', 'actions'],
	ai_edit: ['thumbnail', 'actions'],
	unknown: ['thumbnail', 'actions'],
	unknown_create: [],
} as const

export const MANIFEST_CONTENT_TAB_DEFAULT = 'thumbnail'
///////////////// Icons ////////////////
export const ICON_DEFAULT_SIZE = 24
export const ICON_DEFAULT_STROKE_WIDTH = 2

///////////////// SYW Icons ////////////////
export const SYW_ICONS = {
	signal: [
		['path', {
			d: 'M11.9998 0.00164795C18.6269 0.00183967 24 5.37477 24 12.0019V23.9984H11.9984C5.372 23.9982 0 18.6264 0 12C0.00017186 5.37364 5.37333 0.00164795 11.9998 0.00164795ZM11.9998 2.08219C6.52183 2.08219 2.08072 6.52246 2.08055 12C2.08055 17.4777 6.52066 21.9184 11.9984 21.9185H21.9202V12.0019C21.9201 6.52357 17.4784 2.08239 11.9998 2.08219ZM13.4651 16.2699H14.951V18.3609H9.36961V16.2699H11.0285V11.5526H9.36961V9.46173H13.4651V16.2699ZM13.4995 7.9929H10.7175V5.74641H13.4995V7.9929Z',
			fill: 'currentColor',
			stroke: 'none',
		}],
	],
} satisfies Record<string, SywIconNode>
