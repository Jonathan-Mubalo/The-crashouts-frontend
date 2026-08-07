import { useState } from "react";
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar () {
    const [isNav, setIsNav] = useState(false);

    return (
        <nav className="navbar">
            <Link className="navLink" to="/">Home</Link>
            <Link className="navLink" to="/UserProfile">My Profile</Link>
            <Link className="navLink" to="/UserRole">User roles</Link>
        </nav>
    )
}

export default Navbar;