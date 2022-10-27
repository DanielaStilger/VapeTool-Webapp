import { Auth } from 'firebase/auth';
import { FirebaseAuth } from '../useFirebaseAuth';
import { notifyToLogIn, logoutFirebaseWithRedirect } from './user';

export function verifyCurrentUser(auth: FirebaseAuth): boolean {
  if (!auth.firebaseUser) {
    notifyToLogIn();
    return false;
  }
  return true;
}

export function verifyCurrentUserWithRedirect(auth: Auth) {
  if (!auth.currentUser || auth.currentUser.isAnonymous) {
    logoutFirebaseWithRedirect();
    return false;
  }
  return true;
}
