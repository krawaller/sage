---
sort: '005'
short: 'As thunk'
---
const loadConfig = (id) => (dispatch, getState) => {
  dispatch(loadConfigInit())
  fetch(getConfigUrl(id)).then((result) => {
    dispatch(loadConfigSuccess(result))
  })
}

const loadConfigInit = (id) => ({
  type: 'LOAD_CONFIG_INIT',
  payload: id
})

const loadConfigSuccess = (result) => ({
  type: 'LOAD_CONFIG_SUCCESS',
  payload: result
})