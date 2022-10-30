import * as React from 'react';
import NavigationDrawer from './components/NavigationDrawer';
import { AuthUserProvider, useAuth } from '@/context/FirebaseAuthContext';
import FirebaseAuth from './pages/login';
import UserWizard from '@/pages/user/wizard';
import App from './app';
import ReactDOM from 'react-dom';
import { PageLoading } from '@ant-design/pro-layout';

// Client-side cache, shared for the whole session of the user in the browser.
// https://github.com/mongodb-university/realm-tutorial-web/blob/final/src/App.js
// @ts-ignore: Don't worry about children type
const RequireLoggedInUser = ({ children }) => {
    // Only render children if there is a logged in user.
    const auth = useAuth()
    return auth.firebaseUser ? children : <FirebaseAuth />;
};
// @ts-ignore: Don't worry about type here
const RequireCreatedUserInDatabase = ({ children }) => {
    // @ts-ignore: Don't worry about children type
    const auth = useAuth()
    console.log("auth", auth)
    return auth.dbUser ? auth.dbUser.setup ? children : <UserWizard /> : <PageLoading />;
};


ReactDOM.render(
    <AuthUserProvider>
        <RequireLoggedInUser>
            <RequireCreatedUserInDatabase>
                <NavigationDrawer>
                    <App />
                </NavigationDrawer>
            </RequireCreatedUserInDatabase>
        </RequireLoggedInUser>
    </AuthUserProvider>
    ,
    document.getElementById("root")
);