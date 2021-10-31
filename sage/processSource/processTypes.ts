export type ProcessFileOutput = {
  id: string // will be full filename including kind prefix
  name: string // filename without prefix and extension
  crumbs: string[]
  meta: Record<string, any>
  kind: string
  processed: any
}

export type ProcessDirectoryOutput = {
  id: string
  crumbs: string[]
  meta: Record<string, any>
  files: ProcessFileOutput[]
  folders: ProcessDirectoryOutput[]
}

export type SageFilePage = {
  type: 'file'
} & ProcessFileOutput

export type SageFolderPage = {
  type: 'folder'
  contains: string[]
} & Omit<ProcessDirectoryOutput, 'files' | 'folders'>

export type SageRootPage = Omit<SageFolderPage, 'type'> & {
  type: 'root'
}

export type SagePage = SageFilePage | SageFolderPage | SageRootPage

export type SageLink = {
  short: string
  path: string
  type: SagePage['type']
  kind: string
}
