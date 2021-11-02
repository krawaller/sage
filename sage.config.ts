import { codePlugin, graphPlugin, markdownPlugin, questionPlugin } from './sage'
import { SageConfig } from './sage/configTypes'

const sageConfig: SageConfig = {
  components: {
    folder: './sage/components/Folder',
    root: './sage/components/Root',
    shell: './sage/components/Shell',
    code: './sage/components/Code',
    graph: './sage/components/Graph',
    markdown: './sage/components/Markdown',
    question: './sage/components/Question',
  },
  processors: {
    code: codePlugin,
    graph: graphPlugin,
    markdown: markdownPlugin,
    question: questionPlugin,
  },
  settings: {
    foo: 'bar',
  },
}

export default sageConfig
