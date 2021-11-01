import { ReactNode } from 'react'
import {
  SageFileResource,
  SageFolderResource,
  SageLink,
} from '../processSource/processTypes'

export type SageFolderComponentProps = {
  linkMap: Record<string, SageLink>
  resource: SageFolderResource
}

export type SageFileComponentProps<P = any> = {
  linkMap: Record<string, SageLink>
  resource: SageFileResource<P>
}

export type SageFolderComponent = ((
  props: SageFolderComponentProps
) => JSX.Element | null) & { resource: SageFolderResource }

export type SageFileComponent<P = any> = ((
  props: SageFileComponentProps<P>
) => JSX.Element | null) & { resource: SageFileResource }

export type SageComponent = SageFileComponent | SageFolderComponent
