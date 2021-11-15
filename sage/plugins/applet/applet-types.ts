export type AppletDefinition = {
  componentPath: string
  props: Record<string, any>
}

export type AppletImports<P = any> = {
  Component: (props: P) => JSX.Element
}
