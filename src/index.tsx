import React from 'react'
import NavigationDrawer from './components/NavigationDrawer'
import { AuthProvider, useAuth } from './context/FirebaseAuthContext'
import UserWizard from './pages/user/wizard';
import {
  Routes, Route, BrowserRouter,
} from 'react-router-dom'

import Welcome from './pages/Welcome'
import Cloud from './pages/cloud/Cloud'
import CoilCalculator from './pages/coil/CoilCalculator'
import './index.css'
import Oops from './pages/Oops'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import { IntlProvider } from 'react-intl'
import LiquidBlender from './pages/liquid/LiquidBlender'
import Mixer from './pages/mixer/Mixer'
import OhmLaw from './pages/ohm/OhmLaw'
import Converters from './pages/converters/Converters'
import BatteryLife from './pages/batterylife/BatteryLife'
import FirebaseAuth from './pages/login';
import PageLoading from './components/PageLoading';
import Profile from './pages/user/profile';
import Payment from './pages/payment/Payment';
import { UserProfile } from './pages/user/profile/UserProfile';
import { getUserProfileUrl } from './places/user.places';

// Client-side cache, shared for the whole session of the user in the browser.
// https://github.com/mongodb-university/realm-tutorial-web/blob/final/src/App.js
// @ts-expect-error: Don't worry about children type
const RequireLoggedInUser = ({ children }) => {
  // Only render children if there is a logged in user.
  const auth = useAuth()
  return auth.firebaseUser ? children : <FirebaseAuth />;
};
// @ts-ignore: Don't worry about type here
const RequireCreatedUserInDatabase = ({ children }) => {
  // @ts-ignore: Don't worry about children type
  const auth = useAuth()
  return auth.dbUser ? auth.dbUser.setup ? children : <UserWizard /> : <PageLoading />;
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#2480b3'
        }
      }}
    >
      <IntlProvider locale={navigator.language}>

        <BrowserRouter>
          <AuthProvider>
            <RequireLoggedInUser>
              <RequireCreatedUserInDatabase>
                <Routes>
                  <Route path='/' element={<NavigationDrawer />}>
                    <Route index element={<Welcome />} />
                    <Route path='welcome' element={<Welcome />} />
                    <Route path='coil-calculator' element={<CoilCalculator />} />
                    <Route path='liquid-blender' element={<LiquidBlender />} />
                    <Route path='converters' element={<Converters />} />
                    <Route path='battery-life' element={<BatteryLife />} />
                    <Route path='mixer' element={<Mixer />} />
                    <Route path='ohm-law' element={<OhmLaw />} />
                    <Route path="cloud" element={<Cloud />} />

                    <Route path="user" element={<UserProfile />} />
                    <Route path="user/:userId" element={<UserProfile />} />
                    <Route path="payment" element={<Payment />} />
                    <Route path='*' element={<Oops />} />
                    {/*
                                <Route path="batteries" element={<Batteries />} />
                                <Route path="/payment" element={<Payment />} />
                                <Route path="/payment-success" element={<SuccessPayment />} />
                                <Route path="/payment-cancel" element={<CancelPayment />} />
                                <Route path="/upload" element={<Upload />} />
                                <Route path="/upload-photo" element={<UploadPhoto />} />
                                <Route path="/upload-post" element={<UploadPost />} />
                                */}
                  </Route>
                </Routes>
              </RequireCreatedUserInDatabase>
            </RequireLoggedInUser>
          </AuthProvider>
        </BrowserRouter>
      </IntlProvider>
    </ConfigProvider>
  </React.StrictMode>
)
