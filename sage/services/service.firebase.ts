import { FirebaseApp, FirebaseOptions, initializeApp } from '@firebase/app'
import { useDomain, useSettings } from '../components/contexts'

const apps: Record<string, FirebaseApp> = {}

export const firebaseService = {
  configureApp: (config: FirebaseOptions, domain: string) => {
    if (!apps[domain]) {
      apps[domain] = initializeApp(config, domain)
    }
    return apps[domain]
  },
}

export const useFirebaseApp = () => {
  const settings = useSettings()
  const domain = useDomain()
  return firebaseService.configureApp(settings.firebase, domain)
}
