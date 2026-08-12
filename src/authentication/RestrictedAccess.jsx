import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth'

const RestrictedAccess = ({ children }) => {

    const navigate = useNavigate();
    const auth = getAuth();
useEffect(()=>{
    const userRole = async () => {
        try {
            console.log("Is it working")
            console.log("Getting the email: ", auth.currentUser.email)
            const user = await fetch(`http://localhost:3000/isAuthorised/${auth.currentUser.email}`,
                {
                    method: 'GET',
                    headers: { "Content-Type": "application/json" }
                }
            );

            const data = await json(user);
            if (data.role == "manager" || data.role == "admin") {
                return children;
            }
            else {
                alert("You do not have authorization");
                return navigate(-1);
            }
        }
         catch (error) {
            console.error("Restricted access error: ", error)
        }
    }},[])
}

export default RestrictedAccess;