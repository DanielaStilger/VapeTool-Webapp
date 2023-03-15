import React from 'react';
import NavigationDrawer from './components/NavigationDrawer';
import { AuthProvider, useAuth } from './context/FirebaseAuthContext';
// import FirebaseAuth from './pages/login';
// import UserWizard from './pages/user/wizard';
import { FC } from 'react';
import { Routes, Route } from "react-router-dom";
import Welcome from './pages/Welcome';
import Cloud from './pages/cloud/Cloud';
import CoilCalculator from './pages/coil/CoilCalculator';
import "./index.css";
// import Wizard from './pages/user/wizard';
// import Login from './pages/login';
import Oops from './pages/Oops';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { IntlProvider } from 'react-intl';
// import { PageLoading } from '@ant-design/pro-layout';


// Client-side cache, shared for the whole session of the user in the browser.
// https://github.com/mongodb-university/realm-tutorial-web/blob/final/src/App.js
// @ts-ignore: Don't worry about children type
// const RequireLoggedInUser = ({ children }) => {
//     // Only render children if there is a logged in user.
//     const auth = useAuth()
//     return auth.firebaseUser ? children : <FirebaseAuth />;
// };
// // @ts-ignore: Don't worry about type here
// const RequireCreatedUserInDatabase = ({ children }) => {
//     // @ts-ignore: Don't worry about children type
//     const auth = useAuth()
//     console.log("auth", auth)
//     return auth.dbUser ? auth.dbUser.setup ? children : <UserWizard /> : <PageLoading />;
// };


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#00b96b',
                },
            }}
        >
            <IntlProvider locale={navigator.language}>

                <BrowserRouter>
                    {/* <AuthProvider> */}
                    {/* <RequireLoggedInUser> */}
                    {/* <RequireCreatedUserInDatabase> */}
                    <NavigationDrawer>
                        <Routes>
                            <Route path="/" element={<Welcome />} />
                            <Route path="/cloud" element={<Cloud />} />
                            <Route path="/coil" element={<CoilCalculator />} />
                            {/* <Route path="/wizard" element={<Wizard/>} /> */}
                            {/* <Route path="/login" element={<Login />} /> */}
                            <Route path="*" element={<Oops />} />
                        </Routes>
                    </NavigationDrawer>
                    {/* </RequireCreatedUserInDatabase> */}
                    {/* </RequireLoggedInUser> */}
                    {/* </AuthProvider> */}
                </BrowserRouter>
            </IntlProvider>
        </ConfigProvider>
    </React.StrictMode>,
)