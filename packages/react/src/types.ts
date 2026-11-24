import type { ComponentPropsWithoutRef } from 'react'
import type { SywEmbedProps } from 'syw-common/types/embed'

export type SywImageAttrs = Omit<ComponentPropsWithoutRef<'img'>, 'src' | 'alt'>

export interface SywReactProps extends SywEmbedProps, Omit<ComponentPropsWithoutRef<'div'>, 'children' | keyof SywEmbedProps> {
	imageAttrs?: SywImageAttrs
}
