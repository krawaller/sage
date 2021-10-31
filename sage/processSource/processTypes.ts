export type ProcessFileOutput = {
  fileName: string
  name: string
  crumbs: string[]
  meta: Record<string, any>
  type: string
  processed: any
}

export type ProcessDirectoryOutput = {
  name: string
  crumbs: string[]
  meta: Record<string, any>
  files: ProcessFileOutput[]
  folders: ProcessDirectoryOutput[]
}
