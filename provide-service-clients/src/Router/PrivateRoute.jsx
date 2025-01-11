import React, { useContext } from 'react';
import { AuthContext } from '../Auth-provider/AuthProvider';
import Loader from './Loader';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { loading, user } = useContext(AuthContext)
    const location = useLocation()

    if (loading) {
        return <Loader />
    }

    if (user) {
        return children
    }
    return <Navigate  to='/login' state={location.pathname}></Navigate>

};

export default PrivateRoute;

