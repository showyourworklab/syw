import 'syw-common/css/styles.css'
import { useEffect, useMemo, useRef } from 'react'
import type { ComponentPropsWithoutRef } from 'react'
import type { MapOptions, UiEventHandler } from 'syw-common/types/ui'
import { classNames } from 'syw-common/helpers'
import { useUiContext } from '$src/context/ui'
import Figure from './Figure'
import Cutline from './Cutline'
import Caption from './Caption'
import Media from './Media'
import ProvenanceExpand from './ProvenanceExpand'
import ProvenanceModal from './ProvenanceModal'
import ProvenancePopover from './ProvenancePopover'
import ProvenanceDrawer from './ProvenanceDrawer'

interface AppProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
	mapOptions: MapOptions
	onEvent?: UiEventHandler
}

function App({
	mapOptions,
	onEvent,
	className,
	...props
} : AppProps) {
	const ref = useRef<HTMLDivElement>(null)
	const {
		variant,
		isHoverImage,
		isProvenanceOpen,
		setElem,
		setMapOptions,
		eventHandler
	} = useUiContext()

	const classes = useMemo(() =>
		classNames(
			'App',
			`App_${variant}`,
			isHoverImage ? 'App_hovered' : false,
			isProvenanceOpen ? 'App_active' : false,
			className
		)
	, [variant, isHoverImage, isProvenanceOpen, className])

	useEffect(() => {
		setElem(ref.current)
	}, [setElem])

	useEffect(() => {
		setMapOptions(mapOptions)
	}, [mapOptions, setMapOptions])

	useEffect(() => {
		eventHandler.current = onEvent ?? null
	}, [eventHandler, onEvent])

	return (
		<div
			ref={ref}
			className={classes}
			{...props}
		>
			<Figure>
				<Media />
				<Cutline />
				<Caption />
			</Figure>
			{variant === 'expand' ? <ProvenanceExpand /> : null}
			{variant === 'modal' ? <ProvenanceModal /> : null}
			{variant === 'popover' ? <ProvenancePopover /> : null}
			{variant === 'drawer-left' ? <ProvenanceDrawer direction='left' /> : null}
			{variant === 'drawer-right' ? <ProvenanceDrawer direction='right' /> : null}
			{variant === 'drawer-bottom' ? <ProvenanceDrawer direction='bottom' /> : null}
		</div>
	)
}

export default App
