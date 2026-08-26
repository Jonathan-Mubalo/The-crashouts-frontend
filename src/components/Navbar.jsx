import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './Navbar.css';
import Logo from "../assets/Logo.png"

function Navbar() {

  const [navDisplay, setNavDisplay] = useState(<nav>
    <Link to="/"><img src={Logo} alt="Logo" className="navLogo" /></Link>
    <Link className="navLink" to="/">Home</Link>
    <Link className="navLink" to="/Events">Events</Link>
    <Link className="navLink" to="/UserProfile">Profile</Link>
    <Link className="navLink" to="/Contact">Contact</Link>
  </nav>);

  useEffect(() => {

    const accessTokenEmail = JSON.parse(sessionStorage.getItem("accessToken"));

    const handleNavbarDisplay = async () => {

      try {
        const response = await fetch(`http://localhost:3000/isAuthorised/${accessTokenEmail}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });

        const data = await response.json();
  

        if (data.role === "admin") {
        
          setNavDisplay(
            <nav>
              <Link to="/"><img src={Logo} alt="Logo" className="navLogo" /></Link>
              <Link className="navLink" to="/">Home</Link>
              <Link className="navLink" to="/Events">Events</Link>
              <Link className="navLink" to="/Venues">Venues</Link>
              <Link className="navLink" to="/RegisterVenue">My Venues</Link>
              <Link className="navLink" to="/UserProfile">Profile</Link>
              <Link className="navLink" to="/Contact">Contact</Link>
              <Link className="navLink" to="/Dashboard">Dashboard</Link>
              <Link className="navLink" to="/DisplayVenue">DisplayVenue</Link>
              <Link className="navLink" to="/VenueUpdated">VenueUpdated</Link>
            </nav>
          )
        }

        else if (data.role === "manager") {
          setNavDisplay(
            <nav>
              <Link to="/"><img src={Logo} alt="Logo" className="navLogo" /></Link>
              <Link className="navLink" to="/">Home</Link>
              <Link className="navLink" to="/Events">Events</Link>
              <Link className="navLink" to="/Venues">Venues</Link>
              <Link className="navLink" to="/RegisterVenue">My Venues</Link>
              <Link className="navLink" to="/UserProfile">Profile</Link>
            </nav>
          )
        }

        // else if (data.role === "customer") {
          // return (
          // setNavDisplay(
          //   <nav>
          //     <Link className="navLink" to="/">Home</Link>
          //     <Link className="navLink" to="/Events">Events</Link>
          //     <Link className="navLink" to="/SeatBooking">My Bookings</Link>
          //     <Link className="navLink" to="/UserProfile">Profile</Link>
          //   </nav>
          // )
          // );
        // }
      }
      catch (error) {
        console.error("Error displaying the navbar: ", error);
      }
    }
    handleNavbarDisplay();
  }, [])

  return navDisplay;

}

export default Navbar;