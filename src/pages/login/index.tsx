import React from 'react'
import StyledFirebaseAuth from '@/components/StyledFirebaseAuth'
import { auth } from '@/utils/firebase'
import { UserCredential, GoogleAuthProvider, FacebookAuthProvider, EmailAuthProvider } from 'firebase/auth'

import Footer from '@/components/Footer';
import CookieConsent from 'react-cookie-consent';
import { Typography } from 'antd';
import styles from './style.less';

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
const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.main}>
          <StyledFirebaseAuth
            uiConfig={firebaseAuthConfig}
            firebaseAuth={auth()}
          />
          </div>
        <div style={{ textAlign: 'center' }}>
          <Typography>
            By logging in You accept our{' '}
            {/* To be added here!!!!!!
        <a href="">Terms of Service</a> */}
            <a target="__blank" href="https://vapetool.app/privacy_policy">
              Privacy Policy
            </a>
          </Typography>
        </div>
      </div>
      <CookieConsent
        location="bottom"
        buttonText="Okay!"
        cookieName="awesomeCookie"
        style={{ background: '#2B373B' }}
        buttonStyle={{ color: '#4e503b', fontSize: '13px' }}
        expires={150}
      >
        We use cookies to enhance your experience. By continuing to visit this site you agree to our
        use of cookies.
        <a href="https://en.wikipedia.org/wiki/HTTP_cookie">More info</a>
      </CookieConsent>
      <Footer />
    </div>
  );
}

export default Login;