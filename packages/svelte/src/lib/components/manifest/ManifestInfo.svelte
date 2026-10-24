<script lang="ts">
	import { classNames } from 'syw-common/helpers/ui'
	import { MANIFEST_PRIMARY_KEYS } from 'syw-common/constants/ui'
	import type { ManifestInfoProps } from 'syw-common/types/components'
	import ManifestSectionIdentity from './ManifestSectionIdentity.svelte'
	import ManifestSectionPrimary from './ManifestSectionPrimary.svelte'
	import ManifestSectionTrust from './ManifestSectionTrust.svelte'

	const { manifest, className }: ManifestInfoProps = $props()
</script>

<div
	class={classNames('ManifestInfo', className)}
>
	<div
		class={classNames('ManifestInfoColumn')}
	>
		<ManifestSectionIdentity
			manifest={manifest}
		/>
		<ManifestSectionPrimary
			keys={MANIFEST_PRIMARY_KEYS}
			manifest={manifest}
		/>
	</div>
	<div
		class={classNames('ManifestInfoColumn')}
	>
		<ManifestSectionTrust
			manifest={manifest}
		/>
	</div>
</div>
