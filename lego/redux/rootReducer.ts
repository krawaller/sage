import { AppAction } from './types/appAction'
import { AppState } from './types/appState'
import { initialAppState } from './initialAppState'

export const rootReducer: (
  state: AppState | undefined,
  action: AppAction
) => AppState = (state = initialAppState, action) =>
  action.reducer ? action.reducer(state, action.payload) : state
