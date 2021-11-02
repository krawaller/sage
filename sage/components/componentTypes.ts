import { SageConfig } from '../configTypes'
import {
  SageFileResource,
  SageFolderResource,
  SageLink,
  SageResource,
  SageRootResource,
} from '../processSource/processTypes'

export type SageComponentProps<R extends SageResource = SageResource> = {
  settings: SageConfig['settings']
  linkMap: Record<string, SageLink>
  resource: R
}

export type SageComponent<R extends SageResource = SageResource> = (
  props: SageComponentProps<R>
) => JSX.Element | null

export type SagePage<R extends SageResource = SageResource> =
  SageComponent<R> & { resource: R }

export type SageFolderComponent = SageComponent<SageFolderResource>
export type SageRootComponent = SageComponent<SageRootResource>
export type SageFileComponent<P = any> = SageComponent<SageFileResource<P>>

export type SageFolderPage = SagePage<SageFolderResource>
export type SageRootPage = SagePage<SageRootResource>
export type SageFilePage<P = any> = SagePage<SageFileResource<P>>
