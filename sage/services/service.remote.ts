import { FirebaseApp } from '@firebase/app'
import { getDatabase, onValue, ref } from '@firebase/database'
import { useMemo } from 'react'
import { useSettings } from '../components/contexts'
import { useFirebaseApp } from './service.firebase'

const threshold = 5000

export const makeRemoteService = (app: FirebaseApp, presentationId: string) => {
  const db = getDatabase(app)
  return {
    zoom(callback: (v: number) => void) {
      const zoomRef = ref(db, `presentations/${presentationId}/remote/zoom`)
      const start = Date.now()
      return onValue(zoomRef, (snapshot) => {
        const at = Date.now()
        if (at - start > threshold) {
          const data = snapshot.val()
          callback(data)
        }
      })
    },
  }
}

export const useRemoteService = () => {
  const app = useFirebaseApp()
  const { presentationId } = useSettings()
  return useMemo(
    () => makeRemoteService(app, presentationId),
    [app, presentationId]
  )
}

export const useRemoteZoom = (callback: (zoom: number) => void) => {
  const remoteService = useRemoteService()
  return useMemo(() => {
    remoteService.zoom(callback)
  }, [callback, remoteService])
}
