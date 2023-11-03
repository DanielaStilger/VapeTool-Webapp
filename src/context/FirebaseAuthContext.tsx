import { User, Author } from '@vapetool/types';
import { createContext, useContext } from 'react'
import useFirebaseAuth, { FirebaseAuth } from './useFirebaseAuth';
import dayjs from 'dayjs'

// https://usehooks.com/useAuth/
const authUserContext = createContext<FirebaseAuth>({
  firebaseUser: null,
  dbUser: null,
  isUserPro: function (): boolean {
    throw new Error('Function not implemented.');
  },
  isAndroidPro: function (): boolean {
    throw new Error('Function not implemented.');
  },
  isLifetimePro: function (): boolean {
    throw new Error('Function not implemented.');
  },
  toAuthor: function (user: User): Author {
    throw new Error('Function not implemented.');
  },
  signOut: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  getStripeSubscription: function (): { until: dayjs.Dayjs, cancelAtEndPeriod: boolean} | undefined {
    throw new Error('Function not implemented.');
  }
});

// @ts-ignore: Don't worry about type here
export function AuthProvider({ children }) {
  const auth = useFirebaseAuth();
  // @ts-ignore: Don't worry about type here
  return <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>;
}

export const useAuth = (): FirebaseAuth => useContext(authUserContext);