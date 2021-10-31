import { codePlugin, graphPlugin, markdownPlugin } from './sage'
import { Code, Folder, Graph, Markdown, Shell } from './sage/components'

const sageConfig = {
  processors: {
    code: codePlugin,
    graph: graphPlugin,
    markdown: markdownPlugin,
  },
  components: {
    folder: Folder,
    shell: Shell,
    code: Code,
    graph: Graph,
    markdown: Markdown,
  },
}

export default sageConfig
