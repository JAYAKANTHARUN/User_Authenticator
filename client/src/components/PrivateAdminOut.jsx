import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateAdminOut = () => {
    const admin = localStorage.getItem('admin');

    return !admin ? <Outlet /> : <Navigate to='/adminhome' />
}

export default PrivateAdminOut