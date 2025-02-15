import { User } from '@vapetool/types'
import { DataSnapshot, onValue, update } from 'firebase/database'
import { User as FirebaseUser } from 'firebase/auth'
import { userRef, auth } from '../utils/firebase'

import { uploadAvatar } from '../services/storage'
import { notification } from 'antd'
import useRouter from '../utils/useRouter'
import { useAuth } from '../context/FirebaseAuthContext'

export function listenForUserInDb (uid: string, listener: (user: User | null) => void) {
  console.log('About to observe user in database', uid, userRef(uid).toString())
  return onValue(userRef(uid), (snapshot: DataSnapshot) => {
    console.log('observe user snapshot.exist()', snapshot.exists())
    return snapshot.exists() ? listener(snapshot.val()) : listener(null)
  }, (error) => {
    console.error(error)
  })
}

export async function initializeUser (firebaseUser: FirebaseUser): Promise<void> {
  const { uid, email, photoURL, displayName } = firebaseUser
  if (photoURL) {
    initializeAvatar(photoURL, uid)
  }
  return await update(userRef(uid), {
    email,
    display_name: displayName || 'Anonymous',
    setup: true
  })
}

export async function updateDisplayName (uid: string, displayName: string): Promise<void> {
  if (!displayName) {
    console.error('Displayname can not be empty')
    throw new Error('Displayname can not be empty')
  }
  return await update(userRef(uid), { display_name: displayName })
}

function initializeAvatar (avatarUrl: string, userId: string) {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', avatarUrl)
  xhr.responseType = 'blob'
  xhr.onreadystatechange = function onResolve () {
    // Only run if the request is complete
    if (xhr.readyState !== 4) return

    // Process the response
    if (xhr.status >= 200 && xhr.status < 300) {
      // If successful
      uploadAvatar(this.response, userId)
        .then(() => console.log('Successfully uploaded user cloud'))
        .catch((e) => console.error(e))
    } else {
      // If failed
      console.error(`Failed to fetch user avatar from
      url: ${avatarUrl} status: ${this.status} statusText: ${this.statusText}`)
    }
  }
  xhr.send()
}

export async function logoutFirebase (): Promise<void> {
  return auth()
    .signOut()
    .then(() => console.log('signed out complete'))
    .catch((err) => console.error(err))
}

export function notifyToLogIn () {
  notification.open({
    message: 'You need to be logged in!',
    description: 'Click to log in',
    style: {
      cursor: 'pointer'
    },
    onClick: () => useRouter().push('/login')
  })
}

export function isLoggedInOrShowNotification () {
  const { dbUser } = useAuth()
  if (!dbUser) {
    notifyToLogIn()
    return false
  } else {
    return true
  }
}
