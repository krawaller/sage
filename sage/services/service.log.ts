import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { Middleware } from 'redux'

type LogEntry = { category: string; log: any }

export const usePopulateLogServiceContext = () => {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const addLogEntry = useCallback((category: string, log: any) => {
    console.log('LOG', category, log)
    setLogs((curr) => curr.concat({ category, log }))
  }, [])
  const clearLog = useCallback(() => setLogs([]), [])
  return useMemo(() => ({ logs, addLogEntry, clearLog }), [logs, addLogEntry])
}

export type LogService = ReturnType<typeof usePopulateLogServiceContext>

export const SageLogServiceContext = createContext<LogService>({
  logs: [],
  addLogEntry: () => {},
  clearLog: () => {},
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
        addLogEntry('action', action)
        next(action)
        addLogEntry('state', getState())
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
