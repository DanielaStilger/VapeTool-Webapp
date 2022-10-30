import React, { FC } from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Welcome from './pages/Welcome';
import Cloud from './pages/cloud/Cloud';
import Wizard from './pages/user/wizard';
import Login from './pages/login';
import Oops from './pages/Oops';

const App: FC = () => (
    <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/cloud" element={<Cloud />} />
        <Route path="/wizard" element={<Wizard/>} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Oops />} />
    </Routes>
);

export default App;