import 'syw-common/css/styles.css'
import { useEffect, useMemo, useRef } from 'react'
import type { ComponentPropsWithoutRef } from 'react'
import type { MapOptions, UiEventHandler } from 'syw-common/types/ui'
import { classNames } from 'syw-common/helpers/ui'
import { getDataEventType } from 'syw-common/helpers/data'
import { useUiContext } from '$src/context/ui'
import { useDataContext } from '$src/context'
import Figure from '$src/components/figure/Figure'
import ProvenanceExpand from '$src/components/provenance/ProvenanceExpand'
import ProvenanceModal from '$src/components/provenance/ProvenanceModal'
import ProvenancePopover from '$src/components/provenance/ProvenancePopover'
import ProvenanceDrawer from '$src/components/provenance/ProvenanceDrawer'

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
	const data = useDataContext()
	const { phase } = data
	// Read the latest data when the phase changes without firing again on other data changes
	const dataRef = useRef(data)
	dataRef.current = data

	const classes = useMemo(() =>
		classNames(
			'App',
			`App_${phase}`,
			`App_${variant}`,
			isHoverImage ? 'App_hovered' : false,
			isProvenanceOpen ? 'App_active' : false,
			className
		)
	, [phase, variant, isHoverImage, isProvenanceOpen, className])

	useEffect(() => {
		setElem(ref.current)
	}, [setElem])

	useEffect(() => {
		setMapOptions(mapOptions)
	}, [mapOptions, setMapOptions])

	useEffect(() => {
		eventHandler.current = onEvent ?? null
	}, [eventHandler, onEvent])

	// After the event handler effect so the handler is set on first load
	useEffect(() => {
		const type = getDataEventType(dataRef.current)
		if(type) eventHandler.current?.(type, null, dataRef.current)
	}, [phase, eventHandler])

	return (
		<div
			ref={ref}
			className={classes}
			{...props}
		>
			<Figure />
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
