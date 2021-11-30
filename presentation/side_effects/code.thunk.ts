const reduxThunk =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    // Is it a thunk? Then call it, passing in the store methods!
    if (typeof action === 'function') {
      return action(dispatch, getState)
    }
    // Otherwise, pass the action down the middleware chain as usual
    return next(action)
  }
