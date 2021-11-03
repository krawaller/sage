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
    firebase: {
      apiKey: 'AIzaSyBbgosEF_634jX3GzaEvEZB40X7DyAEa6g',
      authDomain: 'sage-vote.firebaseapp.com',
      databaseURL:
        'https://sage-vote-default-rtdb.europe-west1.firebasedatabase.app',
      projectId: 'sage-vote',
      storageBucket: 'sage-vote.appspot.com',
      messagingSenderId: '919235297263',
      appId: '1:919235297263:web:be307ec17686ce6a34c01a',
    },
    emojis: {
      folder: '📁',
      root: '🏠',
      code: '💻',
      question: '🙋',
      graph: '💭',
      markdown: '📖',
    },
  },
}

export default sageConfig
