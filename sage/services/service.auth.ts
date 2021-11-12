import { FirebaseApp } from '@firebase/app'
import {
  GithubAuthProvider,
  signInWithPopup,
  signInAnonymously,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth'
import { getAuth } from 'firebase/auth'
import { useEffect, useMemo, useState } from 'react'
import { useFirebaseApp } from './service.firebase'

export const makeAuthService = (app: FirebaseApp) => ({
  signInAnonymously: async () => {
    const auth = getAuth(app)
    try {
      const result = await signInAnonymously(auth)
      if (!result.user) {
        throw new Error(
          'Anonymous login failed, no user info returned from auth service'
        )
      }
      return {
        error: null,
        data: {
          user: result.user,
        },
      }
    } catch (error) {
      return {
        data: null,
        error,
      }
    }
  },
  signInWithGithubPopup: async () => {
    const auth = getAuth(app)
    const provider = new GithubAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      if (!result.user)
        throw new Error('Login failed, no user info returned from auth service')
      return {
        error: null,
        data: {
          credential: GithubAuthProvider.credentialFromResult(result),
          user: result.user,
        },
      }
    } catch (error: any) {
      error.credential = GithubAuthProvider.credentialFromError(error)
      return {
        data: null,
        error,
      }
    }
  },
  signOut: async () => {
    const auth = getAuth(app)
    try {
      const data = await signOut(auth)
      return {
        data,
        error: null,
      }
    } catch (error) {
      return {
        data: null,
        error,
      }
    }
  },
  subscribeAuth: (callback: (user: User | null) => void) => {
    const auth = getAuth(app)
    return onAuthStateChanged(auth, callback) // returns unsubscriber
  },
  currentAuth: () => {
    const auth = getAuth(app)
    return auth.currentUser
  },
})

// Access current auth info from a React component
export const useCurrentAuth = () => {
  const authService = useAuthService()
  const [auth, setAuth] = useState(authService.currentAuth())
  useEffect(() => {
    const unsub = authService.subscribeAuth(setAuth)
    return unsub
  }, [authService])
  return auth
}

export const useAuthService = () => {
  const app = useFirebaseApp()
  return useMemo(() => makeAuthService(app), [app])
}
