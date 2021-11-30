---
sort: '001'
---
export const useDispatchWithSender = (sender) => {
  const originalDispatch = useDispatch()
  return (action) => {
    action.sender = `VIEW(${sender})`
    return originalDispatch(action)
  }
}
