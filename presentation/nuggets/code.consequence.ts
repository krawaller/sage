---
sort: '003'
---
export const consMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    next(action)
    if (action.cons) {
      action.cons(dispatch, getState, action)
    }
  }
