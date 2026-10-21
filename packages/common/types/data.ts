import type { Reader } from '@contentauth/c2pa-web'
import type { PHASE_KEYS, TRUST_KEYS } from '../constants/data.js'
import { IPTC_DIGITAL_SOURCE_TYPE_KEYS } from '#constants/iptc'
import type { C2paManifest, C2paProvenance } from './c2pa.js'
import type { ManifestTrust } from './trust.js'

export type PhaseKey = typeof PHASE_KEYS[keyof typeof PHASE_KEYS]
export type TrustKey = typeof TRUST_KEYS[keyof typeof TRUST_KEYS]

export type KnownMediaType = 'image' | 'video'

export type MediaType = KnownMediaType | 'unknown'

export type ManifestId = string

export type ManifestTypeKey = 'camera' | 'edit' | 'ai_create' | 'ai_edit' | 'unknown_create' | 'unknown'

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

export interface ManifestTimestamp {
	date: Date
	offset?: string | null
}

export type ManifestProducer = unknown

export type ManifestSignator = string | null

export interface ManifestGeneratorEntry {
	name?: string | null
	icon?: string | null
}
export type ManifestGenerator = ManifestGeneratorEntry[]

export type ManifestActionIptc = typeof IPTC_DIGITAL_SOURCE_TYPE_KEYS[number] | undefined;

export interface ManifestAction {
	key: string,
	iptc: ManifestActionIptc
}

export type ManifestActions = ManifestAction[]

export type ManifestThumbnail = string | null

export interface ManifestLocation {
	lat: number
	lng: number
}

export type ManifestFieldKey = 'timestamp' | 'producer' | 'signator' | 'generator' | 'actions' | 'thumbnail' | 'location'

export interface ManifestIdentity {
	name: string
}

export interface Manifest {
	id?: ManifestId
	type: ManifestType | null
	trust: ManifestTrust
	timestamp: ManifestTimestamp | null
	// Null when the manifest has no CAWG identity
	identity: ManifestIdentity | null
	producer: ManifestProducer
	signator?: ManifestSignator
	generator: ManifestGenerator
	actions?: ManifestActions
	thumbnail: ManifestThumbnail
	location: ManifestLocation | null
	// Missing on manifests added by SYW, like unknown origin
	original?: C2paManifest
}

export interface SywData {
	phase: PhaseKey
	trust: TrustKey
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
