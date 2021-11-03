import { FirebaseApp, FirebaseOptions, initializeApp } from '@firebase/app'
import { useSettings } from '../components/contexts'

let app: FirebaseApp

export const firebaseService = {
  configureApp: (config: FirebaseOptions) => {
    if (!app) {
      app = initializeApp(config, 'SAGEVOTE')
    }
    return app
  },
}

export const useFirebaseApp = () => {
  const settings = useSettings()
  return firebaseService.configureApp(settings.firebase)
}
