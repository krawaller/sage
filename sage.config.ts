import {
  codePlugin,
  graphPlugin,
  markdownPlugin,
  questionPlugin,
  appletPlugin,
  jsonPlugin,
} from './sage'
import type { SageConfig } from './sage/configTypes'

const sageConfig: SageConfig = {
  components: {
    brain: './sage/components/Brain',
    folder: './sage/components/Folder',
    root: './sage/components/Root',
    nav: './sage/components/Nav',
    controls: './sage/components/Controls',
    log: './sage/components/Log',
    code: './sage/components/Code',
    json: './sage/components/Json',
    graph: './sage/components/Graph',
    markdown: './sage/components/Markdown',
    question: './sage/components/Question',
    remote: './sage/components/Remote',
    voter: './sage/components/Voter',
    applet: './sage/components/Applet',
  },
  processors: {
    code: codePlugin,
    graph: graphPlugin,
    markdown: markdownPlugin,
    question: questionPlugin,
    applet: appletPlugin,
    json: jsonPlugin,
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
      log: '🪵',
      clearLog: '🔥',
      code: '⌨️',
      question: '🙋',
      graph: '💭',
      markdown: '📖',
      login: '🔑',
      fullscreen: '🐡',
      applet: '💻',
      json: '🧫',
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
