import React,{ useEffect } from 'react';
import { Navigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth'

const ProtectedRoute = ({children}) => {
    const auth = getAuth();

    // console.log("session storage:",JSON.parse(sessionStorage.getItem("ReserveX")))
    // console.log("access token:",auth.currentUser)
    if( auth.currentUser !== null  || JSON.parse(sessionStorage.getItem("ReserveX")) ){
        return children
    } else{
  return < Navigate to="/Login" />
    }

}
 
export default ProtectedRoute;