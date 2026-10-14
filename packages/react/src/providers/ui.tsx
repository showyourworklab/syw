import { useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { VARIANT_DEFAULT } from 'syw-common/constants/ui'
import type { Manifest } from 'syw-common/types/data'
import type { MapOptions, UiEventHandler, UiState } from 'syw-common/types/ui'
import { UiContext } from '$src/context/ui'

interface UiProviderProps extends Pick<Partial<UiState>, 'variant'> {
	children: ReactNode
}

interface EventLike {
	persist?: () => void
	nativeEvent?: unknown
	detail?: { originalEvent?: unknown }
}

const UiProvider = ({
	variant = VARIANT_DEFAULT,
	children
}: UiProviderProps) => {
	const [elem, setElem] = useState<HTMLElement | null>(null)
	const [mapOptions, setMapOptions] = useState<MapOptions>(null)
	const [isHoverImage, setIsHoverImage] = useState(false)
	const [isProvenanceOpen, setIsProvenanceOpen] = useState(false)
	const [isExplainerOpen, setIsExplainerOpen] = useState(false)
	const openManifests = useRef<Record<string, Manifest>>({})
	const eventHandler = useRef<UiEventHandler | null>(null)

	const handleEvent = (type: string, event: unknown, ...args: unknown[]) => {
		const eventLike = event as EventLike | undefined
		if(typeof eventLike?.persist === "function") eventLike.persist()
		const eventHandlerFunc = eventHandler.current
		const nativeEvent = eventLike?.nativeEvent ?? eventLike?.detail?.originalEvent ?? event
		if(typeof eventHandlerFunc === "function") eventHandlerFunc(type, nativeEvent, ...args)
	}
	const hoverImage = (event?: unknown) => {
		setIsHoverImage(true)
		handleEvent("image.hover", event)
	}
	const unhoverImage = (event?: unknown) => {
		setIsHoverImage(false)
		handleEvent("image.unhover", event)
	}
	const openProvenance = (event?: unknown) => {
		setIsProvenanceOpen(true)
		handleEvent("provenance.open", event)
	}
	const closeProvenance = (event?: unknown) => {
		setIsProvenanceOpen(false)
		handleEvent("provenance.close", event)
	}
	const openExplainer = (event?: unknown) => {
		setIsExplainerOpen(true)
		handleEvent("explainer.open", event)
	}
	const closeExplainer = (event?: unknown) => {
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
				isHoverImage,
				isProvenanceOpen,
				isExplainerOpen,
				openManifests: openManifests.current,
				setElem,
				setMapOptions,
				hoverImage,
				unhoverImage,
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
