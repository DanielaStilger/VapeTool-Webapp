import { createContext, useContext } from 'react'
import useFirebaseAuth, { FirebaseAuth } from '../src/useFirebaseAuth';

const authUserContext = createContext<FirebaseAuth>({
    firebaseUser: null,
    dbUser: null,
    loading: true,
    signInWithEmailAndPassword: async (email: string, password: string) => { return null },
    createUserWithEmailAndPassword: async (email: string, password: string) => { return null },
    signOut: async () => { }
});

  // @ts-ignore: Don't worry about type here
export function AuthUserProvider({ children }) {
    const auth = useFirebaseAuth();
  // @ts-ignore: Don't worry about type here
    return <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>;
}

export const useAuth = (): FirebaseAuth => useContext(authUserContext);