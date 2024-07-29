import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userAuthInfo } from 'src/redux/user/reducer';

export const ProtectedRoute = () => {
    const user = useSelector(userAuthInfo);
    
    
    return user ? <Outlet/> : <Navigate  to='/login' />
};



