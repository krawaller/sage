import {
  createStore,
  compose,
  applyMiddleware,
  StoreEnhancer,
  Middleware,
} from 'redux'
import { initialAppState } from './initialAppState'
import { rootReducer } from './rootReducer'
import { AppState, AppStore, AppConsGetter, AppCons } from './types'
import { rebrickableService } from '../services'
import { createConsequenceMiddleware } from './lib/consequence'
import { loadThemesInit } from './slices/rebrickable/actions'

export type MakeStoreOpts = {
  initialState?: AppState
  enhancers?: StoreEnhancer[]
  middlewares?: Middleware[]
  deps?: any
  consGetter?: AppConsGetter
  initCons?: AppCons
}

export const makeStore = (opts: MakeStoreOpts = {}): AppStore => {
  const {
    initialState,
    enhancers = [],
    middlewares = [],
    deps,
    consGetter = (({ action }) =>
      action.cons ? [action.cons] : []) as AppConsGetter,
    initCons,
  } = opts
  if (consGetter) {
    middlewares.unshift(createConsequenceMiddleware(consGetter, deps))
  }

  const devToolsExtension = (
    typeof window !== 'undefined' ? (window as any) : ({} as any)
  ).__REDUX_DEVTOOLS_EXTENSION__
  if (typeof devToolsExtension === 'function') {
    enhancers.unshift(devToolsExtension())
  }

  enhancers.unshift(applyMiddleware(...middlewares))

  const store = createStore(
    rootReducer,
    initialState || initialAppState,
    compose(...enhancers)
  )

  if (initCons) {
    setTimeout(() => {
      store.dispatch({
        type: '__APPINIT__',
        payload: undefined,
        cons: initCons,
      })
    }, 0)
  }

  return store
}

export const makeProdStore = (middlewares?: Middleware[]) => {
  return makeStore({
    deps: { rebrickable: rebrickableService },
    middlewares,
    initCons: ({ dispatch }) => dispatch(loadThemesInit()),
  })
}
