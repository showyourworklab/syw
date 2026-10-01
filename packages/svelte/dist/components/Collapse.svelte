<script lang="ts">
	import type { Snippet } from 'svelte'
	import {
		Collapsible as ArkCollapsible,
		useCollapsible as useArkCollapsible
	} from '@ark-ui/svelte/collapsible'
	import type { UseCollapsibleProps } from '@ark-ui/svelte/collapsible'
	import { classNames } from 'syw-common/helpers'
	import type { CollapseProps } from 'syw-common/types/components'

	const id = $props.id();
	const {
		open,
		children
	}: Pick<CollapseProps, 'open'> & { children: Snippet } = $props();
	
	const arkCollapsible = useArkCollapsible(() => ({
		id,
		open,
	}) as UseCollapsibleProps)

	const classes = $derived(
		classNames(
			'Collapse',
			open ? 'Collapse_open' : false
		)
	)
</script>

<ArkCollapsible.RootProvider
	id={id}
	class={classes}
	value={arkCollapsible}
	aria-expanded={open}
>
	<ArkCollapsible.Content
		class={classNames('CollapseInner')}
	>
		{@render children()}
	</ArkCollapsible.Content>
</ArkCollapsible.RootProvider>
