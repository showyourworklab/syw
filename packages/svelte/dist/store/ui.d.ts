import { MediaQuery } from 'svelte/reactivity';
import type { Manifest } from 'syw-common/types/data';
import type { MapOptions, MediaQueryKey, UiEventHandler, Variant } from 'syw-common/types/ui';
/**
 * Whether a named media query currently matches, read from its current value
 * @param key - Media query name, like 'sm'
 * @return Media query, false when rendered on the server
 */
export declare const useMediaQuery: (key: MediaQueryKey) => MediaQuery;
export default function createUiStore(): {
    elem: import("svelte/store").Writable<HTMLElement | null>;
    variant: import("svelte/store").Writable<string>;
    mapOptions: import("svelte/store").Writable<MapOptions>;
    isHoverImage: import("svelte/store").Writable<boolean>;
    isProvenanceOpen: import("svelte/store").Writable<boolean>;
    isExplainerOpen: import("svelte/store").Writable<boolean>;
    openManifests: import("svelte/store").Writable<Record<string, Manifest>>;
    eventHandler: import("svelte/store").Writable<UiEventHandler | null>;
    setElem: (value: HTMLElement | null) => void;
    setVariant: (value: Variant | string) => void;
    setMapOptions: (value: MapOptions) => void;
    hoverImage: (event?: unknown) => void;
    unhoverImage: (event?: unknown) => void;
    openProvenance: (event?: unknown) => void;
    closeProvenance: (event?: unknown) => void;
    openExplainer: (event?: unknown) => void;
    closeExplainer: (event?: unknown) => void;
    openManifest: (event: unknown, manifest: Manifest) => void;
    closeManifest: (event: unknown, manifest: Manifest) => void;
    setEventHandler: (val: UiEventHandler | null) => void;
    handleEvent: UiEventHandler;
};
export type UiStore = ReturnType<typeof createUiStore>;
export declare const setUiContext: (store: UiStore) => {
    elem: import("svelte/store").Writable<HTMLElement | null>;
    variant: import("svelte/store").Writable<string>;
    mapOptions: import("svelte/store").Writable<MapOptions>;
    isHoverImage: import("svelte/store").Writable<boolean>;
    isProvenanceOpen: import("svelte/store").Writable<boolean>;
    isExplainerOpen: import("svelte/store").Writable<boolean>;
    openManifests: import("svelte/store").Writable<Record<string, Manifest>>;
    eventHandler: import("svelte/store").Writable<UiEventHandler | null>;
    setElem: (value: HTMLElement | null) => void;
    setVariant: (value: Variant | string) => void;
    setMapOptions: (value: MapOptions) => void;
    hoverImage: (event?: unknown) => void;
    unhoverImage: (event?: unknown) => void;
    openProvenance: (event?: unknown) => void;
    closeProvenance: (event?: unknown) => void;
    openExplainer: (event?: unknown) => void;
    closeExplainer: (event?: unknown) => void;
    openManifest: (event: unknown, manifest: Manifest) => void;
    closeManifest: (event: unknown, manifest: Manifest) => void;
    setEventHandler: (val: UiEventHandler | null) => void;
    handleEvent: UiEventHandler;
};
export declare const getUiContext: () => {
    elem: import("svelte/store").Writable<HTMLElement | null>;
    variant: import("svelte/store").Writable<string>;
    mapOptions: import("svelte/store").Writable<MapOptions>;
    isHoverImage: import("svelte/store").Writable<boolean>;
    isProvenanceOpen: import("svelte/store").Writable<boolean>;
    isExplainerOpen: import("svelte/store").Writable<boolean>;
    openManifests: import("svelte/store").Writable<Record<string, Manifest>>;
    eventHandler: import("svelte/store").Writable<UiEventHandler | null>;
    setElem: (value: HTMLElement | null) => void;
    setVariant: (value: Variant | string) => void;
    setMapOptions: (value: MapOptions) => void;
    hoverImage: (event?: unknown) => void;
    unhoverImage: (event?: unknown) => void;
    openProvenance: (event?: unknown) => void;
    closeProvenance: (event?: unknown) => void;
    openExplainer: (event?: unknown) => void;
    closeExplainer: (event?: unknown) => void;
    openManifest: (event: unknown, manifest: Manifest) => void;
    closeManifest: (event: unknown, manifest: Manifest) => void;
    setEventHandler: (val: UiEventHandler | null) => void;
    handleEvent: UiEventHandler;
};
