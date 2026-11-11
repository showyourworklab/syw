<script lang="ts">
	import type { Snippet } from 'svelte'
	import { DETAIL_TRUST_KEYS } from 'syw-common/constants/data'
	import { classNames } from 'syw-common/helpers/ui'
	import type { ManifestDetailHeaderProps } from 'syw-common/types/components'
	import { getI18nContext } from '../../store/i18n.js'
	import Icon from '../shared/Icon.svelte'

	const { locale, getText } = getI18nContext()

	const {
		open,
		title,
		titleIcon,
		value,
		trust,
		onToggle,
		className,
	}: ManifestDetailHeaderProps & { value?: string | Snippet | null } = $props()
</script>

<!-- Toggleable headers are buttons, otherwise they're static -->
<svelte:element
	this={onToggle ? 'button' : 'div'}
	type={onToggle ? 'button' : undefined}
	aria-expanded={onToggle ? open : undefined}
	onclick={onToggle}
	role={onToggle ? undefined : 'group'}
	class={classNames(
		'ManifestDetailHeader',
		onToggle ? 'ManifestDetailToggle' : null,
		className,
	)}
>
	<span
		class={classNames('ManifestDetailTitle')}
	>
		{#if titleIcon}
			<Icon
				type={titleIcon}
				className={classNames('ManifestDetailTitleIcon')}
			/>
		{/if}
		<span
			class={classNames('ManifestDetailTitleText')}
		>
			{title}
		</span>
	</span>
	<span
		class={classNames('ManifestDetailValue')}
	>
		{#if trust?.level === DETAIL_TRUST_KEYS.TRUSTED}
			<Icon
				type={trust.level}
				label={getText($locale, 'trust', trust.level)}
				className={classNames('ManifestDetailValueTrust')}
			/>
		{/if}
		<span
			class={classNames('ManifestDetailValueText')}
		>
			{#if typeof value === 'function'}
				{@render value()}
			{:else}
				{value}
			{/if}
		</span>
	</span>
	{#if onToggle}
		<span
			class={classNames('ManifestDetailToggleIcon')}
		>
			<Icon
				type={open ? 'up' : 'down'}
			/>
		</span>
	{/if}
</svelte:element>
