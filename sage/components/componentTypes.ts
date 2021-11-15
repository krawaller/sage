import { SageConfig } from '../configTypes'
import {
  SageFileResource,
  SageFolderResource,
  SageLink,
  SageResource,
  SageRootResource,
} from '../processSource/processTypes'

export type SageComponentProps<
  R extends SageResource = SageResource,
  I extends Record<string, any> = {}
> = {
  settings: SageConfig['settings']
  linkMap: Record<string, SageLink>
  resource: R
  imports: I
}

export type SageComponent<
  R extends SageResource = SageResource,
  I extends Record<string, any> = {}
> = (props: SageComponentProps<R, I>) => JSX.Element | null

export type SagePage<R extends SageResource = SageResource> =
  SageComponent<R> & { resource: R; domain: string }
export type SageUtilPage = SageComponent & { domain: string }

export type SageFolderComponent = SageComponent<SageFolderResource>
export type SageRootComponent = SageComponent<SageRootResource>
export type SageFileComponent<
  P = any,
  I extends Record<string, any> = {}
> = SageComponent<SageFileResource<P>, I>

export type SageFolderPage = SagePage<SageFolderResource>
export type SageRootPage = SagePage<SageRootResource>
export type SageFilePage<P = any> = SagePage<SageFileResource<P>>
