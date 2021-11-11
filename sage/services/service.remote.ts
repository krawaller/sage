import { FirebaseApp } from '@firebase/app'
import {
  DatabaseReference,
  getDatabase,
  onValue,
  ref,
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
    path(callback: (p: string) => void) {
      const pathRef = ref(db, `presentations/${presentationId}/remote/path`)
      return thresholdCallback(pathRef, callback, threshold)
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
      callback(data)
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

export const useRemotePath = (callback: (path: string) => void) => {
  const remoteService = useRemoteService()
  return useMemo(() => {
    remoteService.path(callback)
  }, [callback, remoteService])
}

export const useObeyRemotePath = () => {
  const router = useRouter()
  const handleRemoteRouteChange = useCallback(
    (path) => router.push(path),
    [router]
  )
  useRemotePath(handleRemoteRouteChange)
}
