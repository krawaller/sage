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
