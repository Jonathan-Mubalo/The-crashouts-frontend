import React,{ useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = (children) => {
    const navigate = useNavigate();
   const loginState = localStorage.getItem("ReserveX_Login");
    if(loginState !== null && loginState == true){
        return children
    } else{
navigate("/Login")
 useEffect( ()=>{navigate("/Login")},[])
    }

}
 
export default ProtectedRoute;