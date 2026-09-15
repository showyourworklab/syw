import type { Manifest as C2paManifest, ManifestStore } from '@contentauth/c2pa-types'
import type { Reader, Config } from '@contentauth/c2pa-web'
import type { C2PA_PHASES, C2PA_STATUSES } from '../constants/c2pa.js'
import { IPTC_DIGITAL_SOURCE_TYPE_KEYS } from '#constants/iptc'

export type { C2paManifest }

export type C2paPhase = typeof C2PA_PHASES[keyof typeof C2PA_PHASES]
export type C2paStatus = typeof C2PA_STATUSES[keyof typeof C2PA_STATUSES]

export type C2paOptions = Partial<Config>

export interface C2paProvenance {
	manifestStore: ManifestStore
}

export type ManifestId = string

export type ManifestTypeKey = 'camera' | 'edit' | 'ai' | 'unknown'

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

export type ManifestStatus = C2paStatus

export interface ManifestTimestamp {
	date: Date
	offset?: string | null
}

export type ManifestProducer = unknown

export type ManifestSignator = string | null

export interface ManifestGeneratorEntry {
	name?: string | null
	icon?: {
		identifier?: string
		format?: string
	}
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

export type ManifestVerifyUrl = string

export type ManifestFieldKey = 'timestamp' | 'producer' | 'signator' | 'generator' | 'actions' | 'thumbnail' | 'location'

export interface Manifest {
	id?: ManifestId
	type: ManifestType | null
	status: ManifestStatus
	timestamp: ManifestTimestamp | null
	producer: ManifestProducer
	signator?: ManifestSignator
	generator: ManifestGenerator
	actions?: ManifestActions
	thumbnail: ManifestThumbnail
	location: ManifestLocation | null
	verifyUrl: ManifestVerifyUrl
	original: C2paManifest
}

export interface SywData {
	phase: C2paPhase
	status: C2paStatus
	manifests: Manifest[]
	types: ManifestType[]
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
