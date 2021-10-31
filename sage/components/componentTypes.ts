import { ReactNode } from 'react'
import {
  SageFilePage,
  SageFolderPage,
  SageLink,
} from '../processSource/processTypes'

export type SageFolderComponentProps = {
  linkMap: Record<string, SageLink>
} & SageFolderPage

export type SageFileComponentProps<P = any> = {
  linkMap: Record<string, SageLink>
} & SageFilePage<P>

export type SageFolderComponent = ((
  props: SageFolderComponentProps
) => ReactNode) & { page: SageFolderPage }

export type SageFileComponent<P = any> = ((
  props: SageFileComponentProps<P>
) => ReactNode) & { page: SageFilePage }
