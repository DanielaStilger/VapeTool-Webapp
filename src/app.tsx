import { FC } from 'react';
import { Routes, Route } from "react-router-dom";
import Welcome from './pages/Welcome';
import Cloud from './pages/cloud/Cloud';
import CoilCalculator from './pages/coil/CoilCalculator';
// import Wizard from './pages/user/wizard';
// import Login from './pages/login';
import Oops from './pages/Oops';

const App: FC = () => (
    <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/cloud" element={<Cloud />} />
        <Route path="/coil" element={<CoilCalculator />} />
        {/* <Route path="/wizard" element={<Wizard/>} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="*" element={<Oops />} /> 
    </Routes>
);

export default App;