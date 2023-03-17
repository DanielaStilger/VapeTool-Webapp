import React from 'react'
import NavigationDrawer from './components/NavigationDrawer'
import { AuthProvider, useAuth } from './context/FirebaseAuthContext'
import UserWizard from './pages/user/wizard';
import { FC } from 'react'
import {
  Routes, Route, BrowserRouter,
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import Welcome from './pages/Welcome'
import Cloud from './pages/cloud/Cloud'
import CoilCalculator from './pages/coil/CoilCalculator'
import './index.css'
// import Wizard from './pages/user/wizard';
// import Login from './pages/login';
import Oops from './pages/Oops'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import { IntlProvider } from 'react-intl'
import Payment from './pages/payment/Payment'
import SuccessPayment from './pages/payment/Success'
import CancelPayment from './pages/payment/Cancel'
import Upload from './pages/cloud/Upload'
import UploadPhoto from './pages/cloud/UploadPhoto'
import UploadPost from './components/UploadPost'
import LiquidBlender from './pages/liquid/LiquidBlender'
import Mixer from './pages/mixer/Mixer'
import OhmLaw from './pages/ohm/OhmLaw'
import Converters from './pages/converters/Converters'
import Batteries from './pages/batteries/Batteries'
import BatteryLife from './pages/batterylife/BatteryLife'
import Profile from './pages/user/profile'
import { PageLoading } from '@ant-design/pro-layout';
import FirebaseAuth from './pages/login';

// Client-side cache, shared for the whole session of the user in the browser.
// https://github.com/mongodb-university/realm-tutorial-web/blob/final/src/App.js
// @ts-expect-error: Don't worry about children type
const RequireLoggedInUser = ({ children }) => {
  // Only render children if there is a logged in user.
  const auth = useAuth()
  console.log("RequireLoggedInUser", auth)
  return auth.firebaseUser ? children : <FirebaseAuth />;
};
// @ts-ignore: Don't worry about type here
const RequireCreatedUserInDatabase = ({ children }) => {
  // @ts-ignore: Don't worry about children type
  const auth = useAuth()
  console.log("RequireCreatedUserInDatabase", auth)
  return auth.dbUser ? auth.dbUser.setup ? children : <UserWizard /> : <PageLoading />;
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b96b'
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
                    <Route path='*' element={<Oops />} />
                    <Route path="/cloud" element={<Cloud />} />
                    {/*
                                <Route path="batteries" element={<Batteries />} />
                                <Route path="/payment" element={<Payment />} />
                                <Route path="/payment-success" element={<SuccessPayment />} />
                                <Route path="/payment-cancel" element={<CancelPayment />} />
                                <Route path="/upload" element={<Upload />} />
                                <Route path="/upload-photo" element={<UploadPhoto />} />
                                <Route path="/upload-post" element={<UploadPost />} />
                                <Route path="/user/profile" element={<Profile />} />
                                <Route path="/user/profile/:id" element={<Profile />} />
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
