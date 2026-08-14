import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {

  // const [userRole, setUserRole] = useState();
  const [navDisplay, setNavDisplay] = useState(<nav>
    <Link className="navLink" to="/">Home</Link>
    <Link className="navLink" to="/Events">Events</Link>
    <Link className="navLink" to="/SeatBooking">My Bookings</Link>
    <Link className="navLink" to="/UserProfile">Profile</Link>
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
        // setUserRole(data.role);
        // console.log("The current role: ", data.role)
        // console.log("The current message: ", data.message)

        if (data.role === "admin") {
          // return (

          setNavDisplay(
            <nav>
              <Link className="navLink" to="/">Home</Link>
              <Link className="navLink" to="/Events">Events</Link>
              {/* <Link className="navLink" to="/users">Users</Link> */}
    <Link className="navLink" to="/SeatBooking">Booking</Link>
              <Link className="navLink" to="/RegisterVenue">Venues</Link>
              <Link className="navLink" to="/UserProfile">Profile</Link>
            </nav>
          )
          // );
        }

        else if (data.role === "manager") {
          // return (
          setNavDisplay(
            <nav>
              <Link className="navLink" to="/">Home</Link>
              <Link className="navLink" to="/Events">Events</Link>
              <Link className="navLink" to="/RegisterVenue">My Venues</Link>
              <Link className="navLink" to="/SeatBooking">Booking</Link>
              <Link className="navLink" to="/UserProfile">Profile</Link>
            </nav>
          )
          // );
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