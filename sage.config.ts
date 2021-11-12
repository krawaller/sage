import { codePlugin, graphPlugin, markdownPlugin, questionPlugin } from './sage'
import { SageConfig } from './sage/configTypes'

const sageConfig: SageConfig = {
  components: {
    brain: './sage/components/Brain',
    folder: './sage/components/Folder',
    root: './sage/components/Root',
    breadcrumbs: './sage/components/BreadCrumbs',
    controls: './sage/components/Controls',
    code: './sage/components/Code',
    graph: './sage/components/Graph',
    markdown: './sage/components/Markdown',
    question: './sage/components/Question',
    remote: './sage/components/Remote',
    voter: './sage/components/Voter',
  },
  processors: {
    code: codePlugin,
    graph: graphPlugin,
    markdown: markdownPlugin,
    question: questionPlugin,
  },
  settings: {
    presentationId: 'reduxStuff',
    remoteThreshold: 5000,
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
      login: '🔑',
      fullscreen: '🐡',
    },
    controls: {
      zoomMin: 1,
      zoomMax: 4,
    },
    initialCssVars: {
      zoom: 1, // initial zoom level
    },
  },
}

export default sageConfig
