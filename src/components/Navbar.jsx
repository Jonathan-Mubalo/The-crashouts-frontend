import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "../assets/Logo.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const getRole = async () => {
      try {
        const accessTokenEmail = JSON.parse(
          sessionStorage.getItem("accessToken")
        );

        const API_URL =
          import.meta.env.VITE_API_URL || "http://localhost:3000";

        const response = await fetch(
          `${API_URL}/isAuthorised/${accessTokenEmail}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        setRole(data.role);
      } catch (error) {
        console.error("Error displaying navbar:", error);
      }
    };

    getRole();
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="nav">

      <Link to="/" onClick={closeMenu}>
        <img src={Logo} alt="Logo" className="navLogo" />
      </Link>

      <button
        className="menuBtn"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`navLinks ${menuOpen ? "open" : ""}`}>

        <Link className="navLink" to="/" onClick={closeMenu}>
          Home
        </Link>

        <Link className="navLink" to="/Events" onClick={closeMenu}>
          Events
        </Link>

        {(role === "admin" || role === "manager") && (
          <Link className="navLink" to="/Venues" onClick={closeMenu}>
            Venues
          </Link>
        )}

        {(role === "admin" || role === "manager") && (
          <Link className="navLink" to="/RegisterVenue" onClick={closeMenu}>
            Create venue
          </Link>
        )}

        <Link className="navLink" to="/UserProfile" onClick={closeMenu}>
          Profile
        </Link>

        {(role === "admin") && (
          <Link className="navLink" to="/Contact" onClick={closeMenu}>
            Contact
          </Link>
        )}

        {(role === "admin") && (
          <Link className="navLink" to="/Dashboard" onClick={closeMenu}>
            Dashboard
          </Link>
        )}

      </div>
    </div>
  );
}

export default Navbar;