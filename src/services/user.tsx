import { User, UserPermission } from '@vapetool/types';
import { DataSnapshot, onValue, Unsubscribe, update, get } from 'firebase/database'
import { User as FirebaseUser } from 'firebase/auth'
import { userRef } from '../utils/firebase';

import { uploadAvatar } from './storage';
import snackbar from '../utils/snackbar';
import { Link } from 'react-router-dom';

export function listenForUserInDb(uid: string, listener: (user: User | null) => void) {
  console.log("About to observe user in database", uid, userRef(uid).toString());
  return onValue(userRef(uid), (snapshot: DataSnapshot) =>{
    console.log("observe user snapshot.exist()", snapshot.exists())
    return snapshot.exists() ? listener(snapshot.val()) : listener(null)
  }, (error) => {
    console.error(error);
  });
}

export function initializeUser(firebaseUser: FirebaseUser): Promise<void> {
  const { uid, email, photoURL, displayName } = firebaseUser;
  if (photoURL) {
    initializeAvatar(photoURL, uid);
  }
  return update(userRef(uid), {
      uid,
      display_name: displayName || 'Anonymous',
      email,
      setup: true,
      permission: UserPermission.ONLINE_USER, // Security issue, it should be set server-side, in firebase function
    })
}

export function updateSetupComplete(uid: string): Promise<void> {
    return update(userRef(uid), {setup: true})
}

export function updateDisplayName(uid: string, displayName: string): Promise<void> {
    if (!displayName) {
      console.error('Displayname can not be empty');
      throw new Error('Displayname can not be empty');
    }
    return update(userRef(uid), {display_name: displayName})
}

function initializeAvatar(avatarUrl: string, userId: string) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', avatarUrl);
  xhr.responseType = 'blob';
  xhr.onreadystatechange = function onResolve() {
    // Only run if the request is complete
    if (xhr.readyState !== 4) return;

    // Process the response
    if (xhr.status >= 200 && xhr.status < 300) {
      // If successful
      uploadAvatar(this.response, userId)
        .then(() => console.log('Successfully uploaded user cloud'))
        .catch((e) => console.error(e));
    } else {
      // If failed
      console.error(`Failed to fetch user avatar from
      url: ${avatarUrl} status: ${this.status} statusText: ${this.statusText}`);
    }
  };
  xhr.send();
}


export async function logoutFirebaseWithRedirect() {
  // TODO: Implement logout
  // await logoutFirebase();
  // history.replace('/login');
}

export function notifyToLogIn() {
  const action = (<Link to= "/login" > Login </Link>)
  snackbar.warning('You need to log in to access this functionality', action );
}