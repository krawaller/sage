---
sort: '006'
short: 'As cons'
---

const loadConfigInit = (id) => ({
  type: 'LOAD_CONFIG_INIT',
  payload: id,
  cons: (dispatch, getState, action) => {
    fetch(getConfigUrl(id)).then((result) => {
      dispatch(loadConfigSuccess(result))
    })
  }
})

const loadConfigSuccess = (result) => ({
  type: 'LOAD_CONFIG_SUCCESS',
  payload: result
})