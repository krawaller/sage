---
image: "images/inception.jpg"
---

const middleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    return next(action)
  }
