import { ReactNode } from 'react'
import {
  SageFileResource,
  SageFolderResource,
  SageLink,
} from '../processSource/processTypes'

export type SageFolderComponentProps = {
  linkMap: Record<string, SageLink>
} & SageFolderResource

export type SageFileComponentProps<P = any> = {
  linkMap: Record<string, SageLink>
} & SageFileResource<P>

export type SageFolderComponent = ((
  props: SageFolderComponentProps
) => ReactNode) & { resource: SageFolderResource }

export type SageFileComponent<P = any> = ((
  props: SageFileComponentProps<P>
) => ReactNode) & { resource: SageFileResource }

export type SageComponent = SageFileComponent | SageFolderComponent
