import { Code, Folder, Graph, Markdown, Shell } from './sage/components'

const sageAppConfig = {
  components: {
    folder: Folder,
    shell: Shell,
    code: Code,
    graph: Graph,
    markdown: Markdown,
  },
}

export default sageAppConfig
