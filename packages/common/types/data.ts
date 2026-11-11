import type { Reader } from '@contentauth/c2pa-web'
import type { PHASE_KEYS, INTEGRITY_KEYS, TRUST_KEYS, DETAIL_TRUST_KEYS, DETAIL_TRUST_SOURCES } from '../constants/data.js'
import { IPTC_DIGITAL_SOURCE_TYPE_KEYS } from '#constants/iptc'
import type { C2paManifest, C2paProvenance } from './c2pa.js'
import type { ManifestValidation } from './trust.js'

export type PhaseKey = typeof PHASE_KEYS[keyof typeof PHASE_KEYS]
export type IntegrityKey = typeof INTEGRITY_KEYS[keyof typeof INTEGRITY_KEYS]
export type TrustKey = typeof TRUST_KEYS[keyof typeof TRUST_KEYS]

export type MediaType = 'image' | 'video'

export type ManifestId = string

export type ManifestTypeKey = 'camera' | 'edit' | 'ai_create' | 'ai_edit' | 'unknown_create' | 'none' | 'unknown'

export type ManifestTypeIptc = typeof IPTC_DIGITAL_SOURCE_TYPE_KEYS[number] | undefined;

export interface ManifestType {
	key: ManifestTypeKey
	iptc?: ManifestTypeIptc
}

// export interface ManifestTypeIptc {
// 	key?: string | null
// 	label?: string | null
// 	definition?: string | null
// }

export type DetailTrustKey = typeof DETAIL_TRUST_KEYS[keyof typeof DETAIL_TRUST_KEYS]

export type DetailTrustSource = typeof DETAIL_TRUST_SOURCES[keyof typeof DETAIL_TRUST_SOURCES]

export interface DetailTrust {
	level: DetailTrustKey
	source: DetailTrustSource
}

// A manifest detail's value with how far it can be trusted
export interface ManifestDetailValue<T> {
	value: T
	trust: DetailTrust
}

export interface ManifestTimestampValue {
	date: Date
	offset?: string | null
}

export type ManifestTimestamp = ManifestDetailValue<ManifestTimestampValue>

export type ManifestProducer = ManifestDetailValue<string[]>

export type ManifestSignator = string | null

export interface ManifestGeneratorEntry {
	name?: string | null
	icon?: string | null
}
export type ManifestGenerator = ManifestDetailValue<ManifestGeneratorEntry[]>

export type ManifestActionIptc = typeof IPTC_DIGITAL_SOURCE_TYPE_KEYS[number] | undefined;

export interface ManifestAction {
	key: string,
	iptc: ManifestActionIptc
}

export type ManifestActions = ManifestDetailValue<ManifestAction[]>

export type ManifestThumbnail = string | null

export interface ManifestLocationValue {
	lat: number
	lng: number
}

export type ManifestLocation = ManifestDetailValue<ManifestLocationValue>

export type ManifestFieldKey = 'timestamp' | 'producer' | 'signator' | 'generator' | 'actions' | 'thumbnail' | 'location'

export type ManifestIdentity = ManifestDetailValue<string>

export interface Manifest {
	id?: ManifestId
	type: ManifestType | null
	// Null on manifests added by SYW with nothing to validate, like unknown origin
	validation: ManifestValidation | null
	timestamp: ManifestTimestamp | null
	// Null when the manifest has no CAWG identity
	identity: ManifestIdentity | null
	// Null when the manifest names no creator
	producer: ManifestProducer | null
	signator?: ManifestSignator
	// Null when the manifest names no generator
	generator: ManifestGenerator | null
	actions?: ManifestActions | null
	thumbnail: ManifestThumbnail
	location: ManifestLocation | null
	// Missing on manifests added by SYW, like unknown origin
	original?: C2paManifest
}

export interface SywData {
	phase: PhaseKey
	types: ManifestType[]
	mediaType: MediaType
	manifests: Manifest[]
	provenance?: C2paProvenance | null
	reader: Reader | null
	error: Error | null
}

export interface SywMediaData extends SywData {
	src: string | null
	alt: string | null
	caption: string | null
	byline: string | null
}
