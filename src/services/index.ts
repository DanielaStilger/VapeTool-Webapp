import { useAuth } from '../context/FirebaseAuthContext';
import { notifyToLogIn, logoutFirebase } from '../services/user';

export function verifyCurrentUser(): boolean {
  const auth = useAuth()
  if (!auth.firebaseUser) {
    notifyToLogIn();
    return false;
  }
  return true;
}

export function verifyCurrentUserWithRedirect() {
  const auth = useAuth()
  if (!auth.firebaseUser) {
    logoutFirebase();
    return false;
  }
  return true;
}