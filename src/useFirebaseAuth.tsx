import { useState, useEffect } from 'react'
import { auth } from './utils/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User as FirebaseUser, UserCredential, Unsubscribe } from 'firebase/auth'
import { User as DatabaseUser } from '@vapetool/types'
import { listenForUserInDb } from './services/user';

export interface FirebaseAuth {
    firebaseUser: FirebaseUser, dbUser: DatabaseUser, loading: boolean, signInWithEmailAndPassword: (email: string, password: string) => Promise<UserCredential | null>, createUserWithEmailAndPassword: (email: string, password: string) => Promise<UserCredential | null>, signOut: () => Promise<void>
}
// It must be set to local state because useState does not work with functions
let userInDbUnsubscriber: Unsubscribe|null = null

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

        if (userInDbUnsubscriber){
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

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth(), authStateChanged);
        return () => { userInDbUnsubscriber?.(); unsubscribe();  };
    }, []);

    return {
        firebaseUser: authUser,
        dbUser: dbUser,
        signInWithEmailAndPassword: (email: string, password: string) => signInWithEmailAndPassword(auth(), email, password),
        createUserWithEmailAndPassword: (email: string, password: string) => createUserWithEmailAndPassword(auth(), email, password),
        signOut: _signOut
    };
}