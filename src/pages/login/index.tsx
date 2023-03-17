import { useEffect, useRef, useState } from 'react'
import { UserCredential, GoogleAuthProvider, FacebookAuthProvider, EmailAuthProvider, signInWithRedirect, signInWithPopup, getRedirectResult } from 'firebase/auth'
import { Button } from 'antd'
import { auth } from '@/utils/firebase';
import { FacebookOutlined, GoogleOutlined } from '@ant-design/icons';
import { Card } from 'flowbite-react';

const Login = () => {
  return (
    <Card>
      <Button onClick={() => signInWithPopup(auth, new GoogleAuthProvider())} icon={<GoogleOutlined />} block style={{ marginBottom: 10 }}>
        Sign in with Google
      </Button>
      <Button onClick={() => signInWithRedirect(auth, new GoogleAuthProvider())} icon={<FacebookOutlined />} block style={{ marginBottom: 10 }}>
        Sign in with Facebook
      </Button>
    </Card>

  )
  {/* <CookieConsent
        location='bottom'
        buttonText='Okay!'
        cookieName='awesomeCookie'
        style={{ background: '#2B373B' }}
        buttonStyle={{ color: '#4e503b', fontSize: '13px' }}
        expires={150}
      >
        We use cookies to enhance your experience. By continuing to visit this site you agree to our
        use of cookies.
        <a href='https://en.wikipedia.org/wiki/HTTP_cookie'>More info</a>
      </CookieConsent> */}
  //   <Footer />
  // </div>
  // )
}

export default Login
