import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "../assets/Logo.png";

function Navbar() {
  const [navDisplay, setNavDisplay] = useState(
    <div className="nav">
      <Link to="/">
        <img src={Logo} alt="Logo" className="navLogo" />
      </Link>

      <div className="navLinks">
        <Link className="navLink" to="/">Home</Link>
        <Link className="navLink" to="/Events">Events</Link>
        <Link className="navLink" to="/UserProfile">Profile</Link>
        <Link className="navLink" to="/Contact">Contact</Link>
      </div>
    </div>
  );

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const accessTokenEmail = JSON.parse(
      sessionStorage.getItem("accessToken")
    );

    const handleNavbarDisplay = async () => {
      try {
        const API_URL =
          import.meta.env.VITE_API_URL || "http://localhost:3000";

        const response = await fetch(
          `${API_URL}/isAuthorised/${accessTokenEmail}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          }
        );

        const data = await response.json();

        if (data.role === "admin") {
          setNavDisplay(
            <div className="nav">
              <Link to="/">
                <img src={Logo} alt="Logo" className="navLogo" />
              </Link>

              <button
                className="menuBtn"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle navigation"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>

              <div className={`navLinks ${menuOpen ? "open" : ""}`}>
                <Link className="navLink" to="/" onClick={() => setMenuOpen(false)}>
                  Home
                </Link>

                <Link className="navLink" to="/Events" onClick={() => setMenuOpen(false)}>
                  Events
                </Link>

                <Link className="navLink" to="/Venues" onClick={() => setMenuOpen(false)}>
                  Venues
                </Link>

                <Link className="navLink" to="/RegisterVenue" onClick={() => setMenuOpen(false)}>
                  Create venue
                </Link>

                <Link className="navLink" to="/UserProfile" onClick={() => setMenuOpen(false)}>
                  Profile
                </Link>

                <Link className="navLink" to="/Contact" onClick={() => setMenuOpen(false)}>
                  Contact
                </Link>

                <Link className="navLink" to="/Dashboard" onClick={() => setMenuOpen(false)}>
                  Dashboard
                </Link>

                {/* <Link className="navLink" to="/VenueUpdated" onClick={() => setMenuOpen(false)}>
                  VenueUpdated
                </Link> */}
              </div>
            </div>
          );
        }

        if (data.role === "manager") {
          setNavDisplay(
            <div className="nav">
              <Link to="/">
                <img src={Logo} alt="Logo" className="navLogo" />
              </Link>

              <button
                className="menuBtn"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle navigation"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>

              <div className={`navLinks ${menuOpen ? "open" : ""}`}>
                <Link className="navLink" to="/" onClick={() => setMenuOpen(false)}>
                  Home
                </Link>

                <Link className="navLink" to="/Events" onClick={() => setMenuOpen(false)}>
                  Events
                </Link>

                <Link className="navLink" to="/Venues" onClick={() => setMenuOpen(false)}>
                  Venues
                </Link>

                <Link className="navLink" to="/RegisterVenue" onClick={() => setMenuOpen(false)}>
                  Create venue
                </Link>

                <Link className="navLink" to="/UserProfile" onClick={() => setMenuOpen(false)}>
                  Profile
                </Link>
              </div>
            </div>
          );
        }
      } catch (error) {
        console.error("Error displaying the navbar: ", error);
      }
    };

    handleNavbarDisplay();
  }, []);

  return navDisplay;
}

export default Navbar;