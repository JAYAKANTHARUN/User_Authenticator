import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateOut = () => {
    const user = localStorage.getItem('user');

    return !user ? <Outlet /> : <Navigate to='/home' />
}

export default PrivateOut