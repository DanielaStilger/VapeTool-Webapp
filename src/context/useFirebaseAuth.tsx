import { useState, useEffect } from 'react'
import { auth } from '@/utils/firebase';
import { signOut, onAuthStateChanged, User as FirebaseUser, Unsubscribe } from 'firebase/auth'
import { Author, User as DatabaseUser } from '@vapetool/types'
import { listenForUserInDb } from '../services/user';

export interface FirebaseAuth {
    firebaseUser: FirebaseUser | null
    dbUser: DatabaseUser | null
    signOut: () => Promise<void>
    toAuthor: (user: DatabaseUser) => Author
}
// It must be set to local state because useState does not work with functions
let userInDbUnsubscriber: Unsubscribe | null = null

export default function useFirebaseAuth(): FirebaseAuth {
    const [authUser, setAuthUser] = useState<FirebaseUser | null>(null);
    const [dbUser, setDbUser] = useState<DatabaseUser | null>(null);

    const authStateChanged = (authState: FirebaseUser | null) => {
        console.log("authStateChanged", authState)
        if (!authState) {
            setAuthUser(authState);
            return;
        }

        setAuthUser(authState);

        if (userInDbUnsubscriber) {
            userInDbUnsubscriber?.();
        }
        userInDbUnsubscriber = listenForUserInDb(authState.uid, setDbUser)
    };


    const clear = () => {
        setAuthUser(null);
        setDbUser(null);
        userInDbUnsubscriber?.();
    };

    const _signOut = () =>
        signOut(auth()).then(clear);

    const toAuthor = (user: DatabaseUser) => new Author(user.uid, user.display_name);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth(), authStateChanged);
        return () => { userInDbUnsubscriber?.(); unsubscribe(); };
    }, []);


    return {
        firebaseUser: authUser,
        dbUser: dbUser,
        toAuthor,
        signOut: _signOut
    };
}