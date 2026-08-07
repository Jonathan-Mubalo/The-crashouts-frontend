import React from 'react';
import { useNavigate } from 'react-router-dom'
import { signOut, getAuth } from "firebase/auth";
import Navbar from '../components/Navbar';
import './Home.css'

const Home = () => {

    const navigate = useNavigate();
    const auth = getAuth();

    const handleLogout = async () => {

        try {
            const credentials = signOut(auth);
        sessionStorage.setItem("ReserveX",JSON.stringify(false))
      
        console.log("sessionStorage logout: ",   JSON.parse(sessionStorage.getItem("ReserveX")))
        navigate("/Login");
        }
        catch (error) {
            return alert("Unable to currently logout")
        };
    }
    return (
        <>
        <Navbar />
            <h1>This is the home page</h1>
            <button className="logOutBtn" onClick={handleLogout}>Log out</button>
        </>
    );
}

export default Home;