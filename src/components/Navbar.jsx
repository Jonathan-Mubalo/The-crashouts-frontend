import { useState } from "react";
import { Link } from 'react-router-dom'
import './Navbar.css'


function CustomerNavbar() {
  return (
    <nav>
      <Link to="/home">Home</Link>
      <Link to="/bookings">My Bookings</Link>
      <Link to="/profile">Profile</Link>
    </nav>
  );
}

function ManagerNavbar() {
  return (
    <nav>
      <Link to="/home">Home</Link>
      <Link to="/venues">My Venues</Link>
      <Link to="/bookings">Bookings</Link>
      <Link to="/profile">Profile</Link>
    </nav>
  );
}

function AdminNavbar() {
  return (
    <nav>
      <Link to="/home">Home</Link>
      <Link to="/users">Users</Link>
      <Link to="/venues">Venues</Link>
      <Link to="/profile">Profile</Link>
    </nav>
  );
}

function Navbar({ role }) {
  if (role === "admin") {
    return <AdminNavbar />;
  }

  if (role === "manager") {
    return <ManagerNavbar />;
  }

  if (role === "customer") {
    return <CustomerNavbar />;
  }

  return null;
}

export default Navbar;