import { SagePlugin } from '.'

export type SageConfig = {
  components: Record<string, string>
  processors: Record<string, SagePlugin>
  settings: SageSettings
}

export type SageSettings = Record<string, any>
