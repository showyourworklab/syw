import type { ReactNode } from 'react';
import type { UiState } from 'syw-common/types/ui';
import type { SywImageAttrs } from '../types';
interface UiProviderProps extends Pick<Partial<UiState<SywImageAttrs>>, 'variant' | 'imageAttrs'> {
    children: ReactNode;
}
declare const UiProvider: ({ variant, imageAttrs, children }: UiProviderProps) => import("react").JSX.Element;
export default UiProvider;
