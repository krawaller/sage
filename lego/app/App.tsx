import React, { useMemo } from 'react'

import { Provider } from 'react-redux'
import { makeProdStore } from '../redux'

import { Main } from './Main'

import '@blueprintjs/core/lib/css/blueprint.css'
import { useLogServiceMiddleware } from '../../sage/services/service.log'

type AppProps = { version: string }

export const App = ({ version }: AppProps) => {
  const logMiddleware = useLogServiceMiddleware()
  const store = useMemo(() => makeProdStore([logMiddleware]), [logMiddleware])
  return (
    <Provider store={store}>
      <Main version={version} />
    </Provider>
  )
}

export default App
