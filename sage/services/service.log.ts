import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { Middleware } from 'redux'
import jsonDiff from 'json-diff'

type LogEntry = { category: string; log: any }

export const usePopulateLogServiceContext = () => {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [logIsOpen, setLogIsOpen] = useState(false)
  const addLogEntry = useCallback((category: string, log: any) => {
    setLogs((curr) => curr.concat({ category, log }))
  }, [])
  const clearLog = useCallback(() => setLogs([]), [])
  const toggleLogIsOpen = useCallback(() => setLogIsOpen((curr) => !curr), [])
  const openLog = useCallback(() => setLogIsOpen(true), [])
  const closeLog = useCallback(() => setLogIsOpen(false), [])
  return useMemo(
    () => ({
      logs,
      addLogEntry,
      clearLog,
      toggleLogIsOpen,
      openLog,
      closeLog,
      logIsOpen,
    }),
    [logs, addLogEntry, toggleLogIsOpen, openLog, closeLog, logIsOpen]
  )
}

export type LogService = ReturnType<typeof usePopulateLogServiceContext>

export const SageLogServiceContext = createContext<LogService>({
  logs: [],
  addLogEntry: () => {},
  clearLog: () => {},
  toggleLogIsOpen: () => {},
  openLog: () => {},
  closeLog: () => {},
  logIsOpen: false,
})

export const useLogService = () => {
  return useContext(SageLogServiceContext)
}

export const useLogServiceMiddleware = () => {
  const addLogEntry = useAddLogEntry()
  return useMemo(() => {
    const middleware: Middleware =
      ({ getState }) =>
      (next) =>
      (action) => {
        const oldState = getState()
        next(action)
        const newState = getState()
        addLogEntry(action.type, {
          action,
          state: newState,
          diff: jsonDiff.diff(oldState, newState),
        })
      }
    return middleware
  }, [])
}

export const useLogs = () => {
  const { logs } = useLogService()
  return logs
}

export const useAddLogEntry = () => {
  const { addLogEntry } = useLogService()
  return addLogEntry
}
