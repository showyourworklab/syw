import type { Manifest } from './data.js'

export type DeepPartial<T> = T extends Date
	? T
	: T extends (infer U)[]
		? DeepPartial<U>[]
		: T extends object
			? { [K in keyof T]?: DeepPartial<T[K]> | null }
			: T

export type ManifestOverride = DeepPartial<Manifest>

export interface SywDemoProps {
	/**
	 * Merged into each prepared manifest by index, extra items are added as new manifests
	 * @internal Testing only
	 */
	__manifestOverrides?: ManifestOverride[]
}
