<script lang="ts">
	import { classNames } from 'syw-common/helpers'
	import type { TypeBadgeProps } from 'syw-common/types/components'
	import { getI18nContext } from '../store/i18n.js'
    import Badge from './Badge.svelte';

	const { locale, getText } = getI18nContext();

	const { value }: TypeBadgeProps = $props()

	const label = $derived(getText($locale, "type", value?.key ?? ''))
</script>

<Badge
	type={value}
	className={classNames(
		"TypeBadge"
	)}
>
	{label}
</Badge>
