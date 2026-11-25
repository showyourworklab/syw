import 'syw-common/css/fonts.css'
import 'syw-common/css/styles.css'
import { useEffect, useMemo, useRef } from 'react'
import type { ComponentPropsWithoutRef } from 'react'
import type { MapOptions, UiEventHandler } from 'syw-common/types/ui'
import { classNames, observeNearViewport } from 'syw-common/helpers/ui'
import { getC2paEventType } from 'syw-common/helpers/data'
import { useC2paContext } from '$src/context/c2pa'
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
		isProvenanceOpen,
		setElem,
		setMapOptions,
		eventHandler
	} = useUiContext()
	const { loadC2pa } = useC2paContext()
	const data = useDataContext()
	const { phase, manifests } = data
	const isEmpty = getC2paEventType({ phase, manifests }) === 'c2pa.empty'
	// Read the latest data when the phase changes without firing again on other data changes
	const dataRef = useRef(data)
	dataRef.current = data

	const classes = useMemo(() =>
		[
			classNames(
				'App',
				`App_${phase}`,
				`App_${variant}`,
				isEmpty ? 'App_empty' : false,
				isProvenanceOpen ? 'App_active' : false,
			),
			className
		].join(' ')
	, [phase, variant, isEmpty, isProvenanceOpen, className])

	useEffect(() => {
		setElem(ref.current)
	}, [setElem])

	useEffect(() => {
		if(ref.current) return observeNearViewport(ref.current, loadC2pa)
	}, [loadC2pa])

	useEffect(() => {
		if(isProvenanceOpen) loadC2pa()
	}, [isProvenanceOpen, loadC2pa])

	useEffect(() => {
		setMapOptions(mapOptions)
	}, [mapOptions, setMapOptions])

	useEffect(() => {
		eventHandler.current = onEvent ?? null
	}, [eventHandler, onEvent])

	// After the event handler effect so the handler is set on first load
	useEffect(() => {
		const type = getC2paEventType(dataRef.current)
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
