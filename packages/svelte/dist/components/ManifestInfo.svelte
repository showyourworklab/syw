<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import { MANIFEST_PRIMARY_KEYS } from 'syw-common/constants/ui'
	import type { ManifestInfoProps } from 'syw-common/types/components'
	import ManifestIdentity from './ManifestIdentity.svelte'
	import ManifestPrimary from './ManifestPrimary.svelte'
	import ManifestTrust from './ManifestTrust.svelte'

	const { manifest, className }: ManifestInfoProps = $props()
</script>

<div
	class={classNames('ManifestInfo', className)}
>
	<div
		class={classNames('ManifestInfoColumn')}
	>
		<ManifestIdentity
			manifest={manifest}
		/>
		<ManifestPrimary
			keys={MANIFEST_PRIMARY_KEYS}
			manifest={manifest}
		/>
	</div>
	<div
		class={classNames('ManifestInfoColumn')}
	>
		<ManifestTrust
			manifest={manifest}
		/>
	</div>
</div>
