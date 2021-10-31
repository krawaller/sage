import { codePlugin, graphPlugin, markdownPlugin } from './sage'

const sageConfig = {
  processors: {
    code: codePlugin,
    graph: graphPlugin,
    markdown: markdownPlugin,
  },
}

export default sageConfig
