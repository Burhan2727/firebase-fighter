import React, { use } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router';
import { ClockLoader } from "react-spinners";
const PrivateRoute = ({children}) => {
    const {user, loading} = use(AuthContext)
    const location = useLocation()
    console.log(location)
    if(loading){
        return <ClockLoader color='#e74c3c'/>
    }
    if(!user){
        return <Navigate state={location.pathname} to="/signin"></Navigate>
    }
    return children
};

export default PrivateRoute;