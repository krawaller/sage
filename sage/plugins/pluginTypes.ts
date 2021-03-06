export type ProcessorInput<
  M extends Record<string, any> = Record<string, any>
> = {
  content: string
  filePath: string
  meta: M
}

export type Processor<
  P = any,
  M extends Record<string, any> = Record<string, any>
> = (input: ProcessorInput<M>) => Promise<{
  output: P
  additionalMeta?: Record<string, any>
  imports?: Record<string, string>
}>

export type SagePlugin<
  P = any,
  M extends Record<string, any> = Record<string, any>
> = {
  processor: Processor<P, M>
}
