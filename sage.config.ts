import {
  codePlugin,
  graphPlugin,
  markdownPlugin,
  questionPlugin,
  appletPlugin,
  jsonPlugin,
} from './sage'
import type { SageConfig } from './sage/configTypes'
import { tweetPlugin } from './sage/plugins/tweet'

const sageConfig: SageConfig = {
  components: {
    brain: './sage/components/Brain',
    folder: './sage/components/Folder',
    root: './sage/components/Root',
    nav: './sage/components/Nav',
    logo: './sage/components/Logo',
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
    tweet: './sage/components/Tweet',
  },
  processors: {
    code: codePlugin,
    graph: graphPlugin,
    markdown: markdownPlugin,
    question: questionPlugin,
    applet: appletPlugin,
    json: jsonPlugin,
    tweet: tweetPlugin,
  },
  settings: {
    presentationId: 'reduxStuff',
    remoteThreshold: 5000,
    main: {
      logo: '/images/reduxlogo.png',
      logo2: '/images/qdaylogo.svg',
    },
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
      tweet: '🐦',
    },
    controls: {
      zoomMin: 1,
      zoomMax: 4,
    },
    initialCssVars: {
      zoom: 1, // initial zoom level
    },
    voting: {
      url: 'https://bit.ly/qday-redux-vote',
    },
  },
}

export default sageConfig
