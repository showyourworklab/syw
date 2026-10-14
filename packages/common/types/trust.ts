import type { TrustSettings } from '@contentauth/c2pa-web'
import type { TrustKey } from './data.js'
import type { TRUST_LIST_SCOPES, TRUST_LIST_SOURCES, TRUST_LIST_TYPES } from '../constants/trust.js'

export type TrustListKey = keyof typeof TRUST_LIST_SOURCES
export type TrustListType = typeof TRUST_LIST_TYPES[keyof typeof TRUST_LIST_TYPES]
export type TrustListScope = typeof TRUST_LIST_SCOPES[keyof typeof TRUST_LIST_SCOPES]

export interface TrustListSource {
	type: TrustListType
	scopes: TrustListScope[]
	url?: string
	fallback: string
	// Only checked when content isn't trusted by the other lists
	legacy?: boolean
}

export type TrustListSettings = Pick<TrustSettings, TrustListType | 'trustConfig'>

export type ManifestTrustValue = Exclude<TrustKey, 'validating'>

export type ManifestSignatureTrustValue = Extract<ManifestTrustValue, 'trusted' | 'trusted_legacy' | 'valid'>

export interface ManifestTrust {
	value: ManifestTrustValue
	// Null when the manifest has no CAWG identity assertion
	identity: ManifestSignatureTrustValue | null
}
