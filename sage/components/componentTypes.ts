import { SageConfig } from '../configTypes'
import {
  SageFileResource,
  SageFolderResource,
  SageLink,
  SageRootResource,
} from '../processSource/processTypes'

export type SageFolderComponentProps = {
  settings: SageConfig['settings']
  linkMap: Record<string, SageLink>
  resource: SageFolderResource
}

export type SageFileComponentProps<P = any> = {
  settings: SageConfig['settings']
  linkMap: Record<string, SageLink>
  resource: SageFileResource<P>
}

export type SageRootComponentProps = {
  settings: SageConfig['settings']
  linkMap: Record<string, SageLink>
  resource: SageRootResource
}

export type SageFolderComponent = ((
  props: SageFolderComponentProps
) => JSX.Element | null) & { resource: SageFolderResource }

export type SageRootComponent = ((
  props: SageRootComponentProps
) => JSX.Element | null) & { resource: SageRootResource }

export type SageFileComponent<P = any> = ((
  props: SageFileComponentProps<P>
) => JSX.Element | null) & { resource: SageFileResource }

export type SageComponent =
  | SageFileComponent
  | SageFolderComponent
  | SageRootComponent
