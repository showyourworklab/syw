import type { Manifest as C2paManifest, ManifestStore } from '@contentauth/c2pa-types'
import type { Config } from '@contentauth/c2pa-web'

export type { C2paManifest }

export type C2paOptions = Partial<Config>

export interface C2paProvenance {
	manifestStore: ManifestStore
	// Read again with legacy trust lists when the manifest store isn't trusted
	legacyManifestStore?: ManifestStore | null
}
