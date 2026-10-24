import { useEffect, useMemo } from 'react'
import { Collapsible as ArkCollapsible, useCollapsible as useArkCollapsible } from '@ark-ui/react/collapsible'
import { classNames } from 'syw-common/helpers/ui'
import type { CollapseProps } from 'syw-common/types/components'

const Collapse = ({
	open = false,
	children
}: CollapseProps) => {
	const arkCollapsible = useArkCollapsible()

	const className = useMemo(() =>
		classNames(
			'Collapse',
			open ? 'Collapse_open' : false,
		)
	, [open])

	useEffect(() => {
		arkCollapsible.setOpen(open)
	}, [open])

	return (
		<ArkCollapsible.RootProvider
			value={arkCollapsible}
			aria-expanded={open}
			className={className}
		>
			<ArkCollapsible.Content
				className={classNames('CollapseInner')}
			>
				{children}
			</ArkCollapsible.Content>
		</ArkCollapsible.RootProvider>
	)
}

export default Collapse