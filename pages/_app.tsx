import * as React from 'react';
import Head from 'next/head';
import { SnackbarProvider } from 'notistack';
import { AppProps } from 'next/app';
import { ThemeProvider, CssBaseline } from '@mui/material';
import NavigationDrawer from '../src/components/NavigationDrawer';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import { AuthUserProvider, useAuth } from '../context/FirebaseAuthContext';
import FirebaseAuth from './login';
import UserWizard from './wizard';
import WaitingForServer from '../src/components/WaitingForServer';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
// https://github.com/mongodb-university/realm-tutorial-web/blob/final/src/App.js
const RequireLoggedInUser = ({ children }) => {
  // Only render children if there is a logged in user.
  const auth = useAuth()
  return auth.firebaseUser ? children : <FirebaseAuth />;
};
const RequireCreatedUserInDatabase = ({ children }) => {
  // Only render children if there is a logged in user.
  const auth = useAuth()
  console.log("auth", auth)
  return auth.dbUser ? auth.dbUser.setup ? children : <UserWizard /> : <WaitingForServer />;
};


export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <AuthUserProvider>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <SnackbarProvider>
            <RequireLoggedInUser>
              <RequireCreatedUserInDatabase>
                <NavigationDrawer>
                  <Component {...pageProps} />
                </NavigationDrawer>
              </RequireCreatedUserInDatabase>
            </RequireLoggedInUser>
          </SnackbarProvider>
        </ThemeProvider>
      </CacheProvider>
    </AuthUserProvider>
  );
}