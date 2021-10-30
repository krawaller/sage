export type ProcessorInput<M extends Record<string, any> = {}> = {
  content: string
  filePath: string
  meta: Record<string, any>
}

export type Processor<P = any, M extends Record<string, any> = {}> = (
  input: ProcessorInput<M>
) => Promise<P>

export type SagePlugin<P = any, M extends Record<string, any> = {}> = {
  id: string
  processor: Processor<P, M>
}
