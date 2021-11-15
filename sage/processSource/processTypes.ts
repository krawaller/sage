export type ProcessFileOutput<P = any> = {
  id: string // will be full filename including kind prefix
  name: string // filename without prefix and extension
  crumbs: string[]
  meta: Record<string, any>
  kind: string
  processed: P
  imports: Record<string, string>
}

export type ProcessDirectoryOutput = {
  id: string
  crumbs: string[]
  meta: Record<string, any>
  files: ProcessFileOutput[]
  folders: ProcessDirectoryOutput[]
}

export type SageFileResource<P = any> = {
  type: 'file'
} & ProcessFileOutput<P>

export type SageFolderResource = {
  type: 'folder'
  contains: string[]
} & Omit<ProcessDirectoryOutput, 'files' | 'folders'>

export type SageRootResource = Omit<SageFolderResource, 'type'> & {
  type: 'root'
}

export type SageResource<P = any> =
  | SageFileResource<P>
  | SageFolderResource
  | SageRootResource

export type SageLink = {
  short: string
  path: string
  type: SageResource['type']
  kind: string
}
