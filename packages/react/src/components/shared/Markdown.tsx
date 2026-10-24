import { useEffect, useMemo, useState } from 'react'
import { classNames } from 'syw-common/helpers/ui'
import { convertMarkupToSafeHtml } from 'syw-common/helpers/markdown'
import type { MarkdownProps } from 'syw-common/types/components'

function Markdown({
	content,
	tag = 'div',
	className
}: MarkdownProps) {
	const [mounted, setMounted] = useState(false)
	useEffect(() => setMounted(true), [])

	const html = useMemo(() =>
		mounted ? convertMarkupToSafeHtml(content) : ''
	, [mounted, content])

	if(!html) return null
	const Tag = tag as keyof JSX.IntrinsicElements

	return (
		<Tag
			className={classNames('Markdown', className)}
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	)
}

export default Markdown
