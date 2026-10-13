import { C2PA_TRUST_LIST, C2PA_INTERIM_TRUST_LIST, IPTC_TRUST_LIST } from '#trustlists'
import type { Settings, TrustSettings } from '@contentauth/c2pa-web'
import type { TrustListScope, TrustListSource } from '#types/trust'

// Shared across every bundle on the page so each list is fetched once
export const TRUST_LIST_REQUESTS_KEY = Symbol.for('syw.trustListRequests')
// Milliseconds before a trust list request falls back to its bundled copy
export const TRUST_LIST_FETCH_TIMEOUT = 5000
// Keys match c2pa-web's `Settings`
export const TRUST_LIST_SCOPES = {
	// C2PA claim signatures
	C2PA: 'trust',
	// CAWG identity assertion signatures
	CAWG: 'cawgTrust',
} as const satisfies Record<string, keyof Settings>
// Keys match c2pa-web's `TrustSettings`
export const TRUST_LIST_TYPES = {
	// CA certificates
	TRUST_ANCHORS: 'trustAnchors',
	// CA certificates, reported as "User" anchors
	USER_ANCHORS: 'userAnchors',
	// End-entity (signer) certificates
	ALLOWED_LIST: 'allowedList',
} as const satisfies Record<string, keyof TrustSettings>
// Extended Key Usages (EKUs) accepted for signers, passed as `trustConfig`
// https://spec.c2pa.org/specifications/specifications/2.4/specs/C2PA_Specification.html#_c2pa_signers
export const TRUST_LIST_EKUS = {
	[TRUST_LIST_SCOPES.C2PA]: [
		// c2pa-kp-claimSigning, whose trust anchors must include the C2PA Trust List
		'1.3.6.1.4.1.62558.2.1'
	],
	// https://cawg.io/identity/1.2/#_trust_model_for_x_509_certificates
	[TRUST_LIST_SCOPES.CAWG]: [
		// id-kp-documentSigning, which the CAWG trust configuration must accept
		'1.3.6.1.5.5.7.3.36'
	]
} satisfies Record<TrustListScope, string[]>
export const TRUST_LIST_SOURCES = {
	'c2pa': {
		type: TRUST_LIST_TYPES.TRUST_ANCHORS,
		scopes: [TRUST_LIST_SCOPES.C2PA, TRUST_LIST_SCOPES.CAWG],
		url: 'https://raw.githubusercontent.com/c2pa-org/conformance-public/main/trust-list/C2PA-TRUST-LIST.pem',
		fallback: C2PA_TRUST_LIST
	},
	// Frozen since January 1, 2026, and must be distinguished from the C2PA trust list,
	// so it's only checked when content isn't trusted by the lists above
	// https://opensource.contentauthenticity.org/docs/conformance/trust-lists#interim-trust-list
	'c2pa-interim': {
		type: TRUST_LIST_TYPES.USER_ANCHORS,
		legacy: true,
		scopes: [TRUST_LIST_SCOPES.C2PA, TRUST_LIST_SCOPES.CAWG],
		fallback: C2PA_INTERIM_TRUST_LIST
	},
	'iptc': {
		type: TRUST_LIST_TYPES.ALLOWED_LIST,
		scopes: [TRUST_LIST_SCOPES.C2PA, TRUST_LIST_SCOPES.CAWG],
		url: 'https://trust.iptc.org/end-entity-list.pem',
		fallback: IPTC_TRUST_LIST
	},
	// https://cawg.io/identity/1.2/#interim-trust-model
	'iptc-anchors': {
		type: TRUST_LIST_TYPES.TRUST_ANCHORS,
		scopes: [TRUST_LIST_SCOPES.CAWG],
		url: 'https://trust.iptc.org/anchor-list.pem',
		fallback: ''
	}
} satisfies Record<string, TrustListSource>
// Validation codes of a trusted claim signature and CAWG identity
export const TRUSTED_CODES = {
	CLAIM: 'signingCredential.trusted',
	IDENTITY: 'cawg.x509.credential.trusted',
} as const
// Validation codes of an untrusted but otherwise valid signature
export const UNTRUSTED_CODES: string[] = [
	'signingCredential.untrusted',
	'cawg.x509.credential.untrusted',
]
// Assertion label prefix of CAWG identity assertions
export const CAWG_IDENTITY_LABEL = 'cawg.identity'
