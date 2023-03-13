import { useEffect, useRef, useState } from 'react'
import { UserCredential, GoogleAuthProvider, FacebookAuthProvider, EmailAuthProvider } from 'firebase/auth'

import Footer from '../../components/Footer';
import CookieConsent from 'react-cookie-consent';
import { Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/FirebaseAuthContext';
import useStyles from './style';

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
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const { login, currentUser } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { styles } = useStyles();

  useEffect(() => {
    if (currentUser) navigate('/')
  }, [])

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await login(emailRef.current?.value, passwordRef.current?.value)
      navigate('/')
    } catch {
      setError('Failed to log in')
    }

    setLoading(false)
  }
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.main}>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  ref={emailRef}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  ref={passwordRef}
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  to="/forgot-password"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative transition-colors flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  {/* <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  /> */}
                </span>
                Sign in
              </button>
            </div>
            <div className="text-sm text-center">
              <Link
                className="font-medium text-indigo-600 hover:text-indigo-500"
                to="/signup"
              >
                Don't have an account?
              </Link>
            </div>
          </form>
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