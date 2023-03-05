import { Author, User } from '@vapetool/types';
import { createContext, useContext } from 'react'
import useFirebaseAuth, { FirebaseAuth } from './useFirebaseAuth';

// https://usehooks.com/useAuth/
const authUserContext = createContext<FirebaseAuth>({
    firebaseUser: null,
    dbUser: null,
    toAuthor: (user: User) => new Author("", "Anonymous"),
    signOut: async () => { }
});

// @ts-ignore: Don't worry about type here
export function AuthUserProvider({ children }) {
    const auth = useFirebaseAuth();
    // @ts-ignore: Don't worry about type here
    return <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>;
}

export const useAuth = (): FirebaseAuth => useContext(authUserContext);