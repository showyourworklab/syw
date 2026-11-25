import { useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { VARIANT_DEFAULT } from 'syw-common/constants/ui'
import type { Manifest } from 'syw-common/types/data'
import type { MapOptions, UiEventData, UiEventHandler, UiState } from 'syw-common/types/ui'
import { UiContext } from '$src/context/ui'
import type { SywImageAttrs } from '../types'

interface UiProviderProps extends Pick<Partial<UiState<SywImageAttrs>>, 'variant' | 'imageAttrs'> {
	children: ReactNode
}

interface EventLike {
	persist?: () => void
	nativeEvent?: unknown
	detail?: { originalEvent?: unknown }
}

const UiProvider = ({
	variant = VARIANT_DEFAULT,
	imageAttrs = {},
	children
}: UiProviderProps) => {
	const [elem, setElem] = useState<HTMLElement | null>(null)
	const [mapOptions, setMapOptions] = useState<MapOptions>(null)
	const [isProvenanceOpen, setIsProvenanceOpen] = useState(false)
	const [isExplainerOpen, setIsExplainerOpen] = useState(false)
	// Refs mirror the open states so several calls in one handler see the latest value,
	// and each open/close event is only reported when the state actually changes
	const isProvenanceOpenRef = useRef(false)
	const isExplainerOpenRef = useRef(false)
	const openManifests = useRef<Record<string, Manifest>>({})
	const eventHandler = useRef<UiEventHandler | null>(null)

	const handleEvent = (type: string, event: unknown, data?: UiEventData) => {
		const eventLike = event as EventLike | undefined
		if(typeof eventLike?.persist === "function") eventLike.persist()
		const eventHandlerFunc = eventHandler.current
		const nativeEvent = eventLike?.nativeEvent ?? eventLike?.detail?.originalEvent ?? event
		if(typeof eventHandlerFunc === "function") eventHandlerFunc(type, nativeEvent as Event | null | undefined, data)
	}
	const openProvenance = (event?: unknown) => {
		if(isProvenanceOpenRef.current) return
		isProvenanceOpenRef.current = true
		setIsProvenanceOpen(true)
		handleEvent("provenance.open", event)
	}
	const closeProvenance = (event?: unknown) => {
		if(!isProvenanceOpenRef.current) return
		isProvenanceOpenRef.current = false
		setIsProvenanceOpen(false)
		handleEvent("provenance.close", event)
	}
	const openExplainer = (event?: unknown) => {
		if(isExplainerOpenRef.current) return
		isExplainerOpenRef.current = true
		setIsExplainerOpen(true)
		handleEvent("explainer.open", event)
	}
	const closeExplainer = (event?: unknown) => {
		if(!isExplainerOpenRef.current) return
		isExplainerOpenRef.current = false
		setIsExplainerOpen(false)
		handleEvent("explainer.close", event)
	}
	const openManifest = (event: unknown, manifest: Manifest) => {
		const newManifestsOpen = Object.assign(openManifests.current, {})
		newManifestsOpen[String(manifest.id)] = manifest
		openManifests.current = newManifestsOpen
		handleEvent("manifest.open", event, manifest)
	}
	const closeManifest = (event: unknown, manifest: Manifest) => {
		const newManifestsOpen = Object.assign(openManifests.current, {})
		delete newManifestsOpen[String(manifest.id)]
		openManifests.current = newManifestsOpen
		handleEvent("manifest.close", event, manifest)
	}

	return (
		<UiContext.Provider
			value={{
				elem,
				variant,
				mapOptions,
				imageAttrs,
				isProvenanceOpen,
				isExplainerOpen,
				openManifests: openManifests.current,
				setElem,
				setMapOptions,
				openProvenance,
				closeProvenance,
				openExplainer,
				closeExplainer,
				openManifest,
				closeManifest,
				eventHandler,
			}}
		>
			{children}
		</UiContext.Provider>
	)
}

export default UiProvider
