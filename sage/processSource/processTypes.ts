export type ProcessFileOutput = {
  filePath: string
  name: string
  crumbs: string[]
  meta: Record<string, any>
  content: string
  type: string
  processed: any
}
