import { Auth } from 'firebase/auth';
import { FirebaseAuth } from '@/context/useFirebaseAuth';
import { notifyToLogIn, logoutFirebase } from '@/services/user';

export function verifyCurrentUser(auth: FirebaseAuth): boolean {
  if (!auth.firebaseUser) {
    notifyToLogIn();
    return false;
  }
  return true;
}

export function verifyCurrentUserWithRedirect(auth: Auth) {
  if (!auth.currentUser || auth.currentUser.isAnonymous) {
    logoutFirebase();
    return false;
  }
  return true;
}