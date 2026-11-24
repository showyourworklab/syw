import type { MutableRefObject } from 'react';
import type { Manifest } from 'syw-common/types/data';
import type { UiState, UiEventHandler } from 'syw-common/types/ui';
import type { SywImageAttrs } from '../types';
interface UiContextValue extends UiState<SywImageAttrs> {
    setElem: (elem: HTMLElement | null) => void;
    setMapOptions: (options: Record<string, unknown> | null) => void;
    openProvenance: (event?: unknown) => void;
    closeProvenance: (event?: unknown) => void;
    openExplainer: (event?: unknown) => void;
    closeExplainer: (event?: unknown) => void;
    openManifest: (event: unknown, manifest: Manifest) => void;
    closeManifest: (event: unknown, manifest: Manifest) => void;
    eventHandler: MutableRefObject<UiEventHandler | null>;
}
declare const UiContext: import("react").Context<UiContextValue>;
declare const useUiContext: () => UiContextValue;
export { UiContext, useUiContext };
