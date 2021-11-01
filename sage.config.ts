import { codePlugin, graphPlugin, markdownPlugin } from './sage'

const sageConfig = {
  components: {
    folder: '../sage/components/Folder',
    shell: '../sage/components/Shell',
    code: '../sage/components/Code',
    graph: '../sage/components/Graph',
    markdown: '../sage/components/Markdown',
  },
  processors: {
    code: codePlugin,
    graph: graphPlugin,
    markdown: markdownPlugin,
  },
}

export default sageConfig
