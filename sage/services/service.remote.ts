import { FirebaseApp } from '@firebase/app'
import {
  DatabaseReference,
  getDatabase,
  onValue,
  ref,
  set,
} from '@firebase/database'
import { useRouter } from 'next/dist/client/router'
import { useCallback, useMemo } from 'react'
import { useSettings } from '../components/contexts'
import { useFirebaseApp } from './service.firebase'

export const makeRemoteService = (
  app: FirebaseApp,
  presentationId: string,
  threshold = 5000
) => {
  const db = getDatabase(app)
  return {
    zoom(callback: (v: number) => void) {
      const zoomRef = ref(db, `presentations/${presentationId}/remote/zoom`)
      return thresholdCallback(zoomRef, callback, threshold)
    },
    setZoom(zoom: number) {
      const zoomRef = ref(db, `presentations/${presentationId}/remote/zoom`)
      set(zoomRef, zoom)
    },
    path(callback: (p: string) => void) {
      const pathRef = ref(db, `presentations/${presentationId}/remote/path`)
      return thresholdCallback(pathRef, callback, threshold)
    },
    setPath(p: string) {
      const pathRef = ref(db, `presentations/${presentationId}/remote/path`)
      set(pathRef, p)
    },
  }
}

const thresholdCallback = (
  ref: DatabaseReference,
  callback: (t: any) => void,
  threshold: number
) => {
  const start = Date.now()
  return onValue(ref, (snapshot) => {
    const at = Date.now()
    if (at - start > threshold) {
      const data = snapshot.val()
      if (typeof window !== 'undefined') {
        callback(data)
      }
    }
  })
}

export const useRemoteService = () => {
  const app = useFirebaseApp()
  const { presentationId, remoteThreshold } = useSettings()
  return useMemo(
    () => makeRemoteService(app, presentationId, remoteThreshold),
    [app, presentationId]
  )
}

export const useRemoteZoom = (callback: (zoom: number) => void) => {
  const remoteService = useRemoteService()
  return useMemo(() => {
    remoteService.zoom(callback)
  }, [callback, remoteService])
}

export const useSetRemoteZoom = () => {
  const remoteService = useRemoteService()
  return useCallback((zoom: number) => {
    remoteService.setZoom(zoom)
  }, [])
}

export const useRemotePath = (callback: (path: string) => void) => {
  const remoteService = useRemoteService()
  return useMemo(() => {
    remoteService.path(callback)
  }, [callback, remoteService])
}

export const useSetRemotePath = () => {
  const remoteService = useRemoteService()
  return useCallback((p: string) => {
    remoteService.setPath(p)
  }, [])
}

export const useObeyRemotePath = () => {
  const router = useRouter()
  const handleRemoteRouteChange = useCallback(
    (path) => router.push(path),
    [router]
  )
  useRemotePath(handleRemoteRouteChange)
}
