import React, { FunctionComponent, useMemo } from 'react'

import { Provider } from 'react-redux'
import { makeProdStore } from '../redux'

import { Main } from './Main'

import '@blueprintjs/core/lib/css/blueprint.css'

type AppProps = { version: string }

export const App = ({ version }: AppProps) => {
  const store = useMemo(makeProdStore, [])
  return (
    <Provider store={store}>
      <Main version={version} />
    </Provider>
  )
}

export default App
