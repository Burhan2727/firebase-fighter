import React from 'react';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import Navbar from '../components/Navbar';
const MainLayout = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
            <ToastContainer/>
        </div>
    );
};

export default MainLayout;