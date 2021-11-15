export type ProcessorInput<M extends Record<string, any> = {}> = {
  content: string
  filePath: string
  meta: M
}

export type Processor<P = any, M extends Record<string, any> = {}> = (
  input: ProcessorInput<M>
) => Promise<P>

export type Importer<P = any, M extends Record<string, any> = {}> = (
  input: ProcessorInput<M> & { processed: P }
) => Record<string, string>

export type SagePlugin<P = any, M extends Record<string, any> = {}> = {
  processor: Processor<P, M>
  importer?: Importer<P, M>
}
