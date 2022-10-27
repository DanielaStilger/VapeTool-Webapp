import * as React from 'react';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider, CssBaseline } from '@mui/material';
import NavigationDrawer from './components/NavigationDrawer';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from './theme';
import createEmotionCache from './createEmotionCache';
import { AuthUserProvider, useAuth } from '../context/FirebaseAuthContext';
import FirebaseAuth from './pages/login';
import UserWizard from './pages/wizard';
import WaitingForServer from './components/WaitingForServer';
import App from './App';
import ReactDOM from 'react-dom';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
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


ReactDOM.render(
    <AuthUserProvider>
      <CacheProvider value={clientSideEmotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider>
            <RequireLoggedInUser>
              <RequireCreatedUserInDatabase>
                <NavigationDrawer>
                  <App />
                </NavigationDrawer>
              </RequireCreatedUserInDatabase>
            </RequireLoggedInUser>
          </SnackbarProvider>
        </ThemeProvider>
      </CacheProvider>
    </AuthUserProvider>
  ,
  document.getElementById("root")
);