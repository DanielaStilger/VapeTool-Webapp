/* globals window */
import React, { useEffect, useState } from 'react'
import StyledFirebaseAuth from '../src/components/StyledFirebaseAuth'
import firebase from 'firebase/app'
import { auth } from '../src/utils/firebase'
import { User, UserCredential, GoogleAuthProvider, FacebookAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User as FirebaseUser, EmailAuthProvider } from 'firebase/auth'

const firebaseAuthConfig = {
    signInFlow: 'redirect',
    // Auth providers
    // https://github.com/firebase/firebaseui-web#configure-oauth-providers
    signInOptions: [
        {
            provider: EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: true,
        },
        GoogleAuthProvider.PROVIDER_ID,
        FacebookAuthProvider.PROVIDER_ID,
    ],
    privacyPolicyUrl: "https://vapetool.app/privacy_policy",
    tosUrl: "https://vapetool.app/privacy_policy",
    credentialHelper: 'none',
    callbacks: {
        // https://github.com/firebase/firebaseui-web#signinsuccesswithauthresultauthresult-redirecturl
        signInSuccessWithAuthResult: (authResult: UserCredential, redirectUrl: string) => {
            console.log("Success")
            return true
        },
        signInFailure: (error: any) => {
            console.error("Signin failure", error)

        },
        uiShown: () => {
            console.log("uiShown")
        }
            // Don't automatically redirect. We handle redirects using
            // `next-firebase-auth`.
    },
}
const FirebaseAuth = () => {
    // Do not SSR FirebaseUI, because it is not supported.
    // https://github.com/firebase/firebaseui-web/issues/213
    const [renderAuth, setRenderAuth] = useState(false)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setRenderAuth(true)
        }
    }, [])
    return (
        <div>
            {renderAuth ? (
                <StyledFirebaseAuth
                    uiConfig={firebaseAuthConfig}
                    firebaseAuth={auth()}
                />
            ) : null}
        </div>
    )
}

export default FirebaseAuth