import { useState, useEffect } from 'react'
import { auth } from '../utils/firebase'
import { signOut, onAuthStateChanged, User as FirebaseUser, Unsubscribe } from 'firebase/auth'
import { Author, User as DatabaseUser } from '@vapetool/types'
import { listenForUserInDb } from '../services/user'
import dayjs from 'dayjs'

export interface FirebaseAuth {
  firebaseUser: FirebaseUser | null
  dbUser: DatabaseUser | null
  isUserPro: () => boolean
  isAndroidPro: () => boolean
  isLifetimePro: () => boolean
  getStripeSubscription: () => { until: dayjs.Dayjs, cancelAtEndPeriod: boolean } | undefined
  signOut: () => Promise<void>
  toAuthor: (user: DatabaseUser) => Author
}
// It must be set to local state because useState does not work with functions
let userInDbUnsubscriber: Unsubscribe | null = null

export default function useFirebaseAuth(): FirebaseAuth {
  const [authUser, setAuthUser] = useState<FirebaseUser | null>(null)
  const [dbUser, setDbUser] = useState<DatabaseUser | null>(null)

  const authStateChanged = (authState: FirebaseUser | null) => {
    console.log('authStateChanged', authState)
    if (authState == null) {
      setAuthUser(authState)
      return
    }

    setAuthUser(authState)

    if (userInDbUnsubscriber != null) {
      userInDbUnsubscriber?.()
    }
    userInDbUnsubscriber = listenForUserInDb(authState.uid, setDbUser)
  }
  const getStripeSubscription = (): { until: dayjs.Dayjs, cancelAtEndPeriod: boolean } | undefined => {
    const stripeSubscription = dbUser?.stripeSubscription
    const stripeCancelAtEndPeriod = dbUser?.stripeCancelAtEndPeriod
    return dbUser?.stripeSubscription ? { cancelAtEndPeriod: stripeCancelAtEndPeriod, until: dayjs(stripeSubscription) } : undefined
  }

  const isUserPro = () => {
    const userSubscription = dbUser?.stripeSubscription
    const webLifetime = dbUser?.webPro
    if (webLifetime) {
      return true
    } else if (userSubscription) {
      return userSubscription && dayjs(userSubscription).isAfter()
    } else {
      return false
    }
  }

  const isAndroidPro = () => dbUser?.pro === true
  const isLifetimePro = () => dbUser?.webPro === true

  const clear = () => {
    setAuthUser(null)
    setDbUser(null)
    userInDbUnsubscriber?.()
  }

  const _signOut = async () =>
    await signOut(auth).then(clear)

  const toAuthor = (user: DatabaseUser) => new Author(user.uid, user.display_name)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged)
    return () => { userInDbUnsubscriber?.(); unsubscribe() }
  }, [])

  return {
    firebaseUser: authUser,
    dbUser,
    isUserPro,
    isAndroidPro,
    isLifetimePro,
    getStripeSubscription,
    toAuthor,
    signOut: _signOut
  }
}
