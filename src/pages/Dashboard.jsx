import Navbar from "../components/Navbar";
import "./Dashboard.css"
import React from 'react'
import { useState } from "react";
import Footer from "../components/Footer"   
import Logo from "../assets/Logo.png"

const Dashboard = () =>{

const ownersData = [{
    name : "Elise Mwanza",
    email: "elisemwanza@gmail.com",
    role:  "Admin",
    date:  "10 Aug,2026",
    status: "active",
},
{
    name : "Jonathan Mubalo",
    email: "Jonathanmubalo@gmail.com",
    role:  "Owner",
    date:  "24 Aug,2026",
    status: "active",
},
{
    name : "Jessica Kapila",
    email: "jessicakapila34@gmail.com",
    role:  "Owner",
    date:  "18 Dec,2026",
    status: "active",
},
{
    name: "John Doe",
    email: "johndoe@gmail.com",
    role: "Pending",
    date: "11 Aug, 2026",
    status: "pending",
 },
{
    name : "John Doe",
    email: "johndoe@gamil.com",
    role:  "Owner",
    date:  "11 Aug,2026",
    status: "active",
},
{
    name : "Jane Doe",
    email: "Janedoe@gmail.com",
    role:  "Owner",
    date:  "02 Aug,2026",
    status: "active",
},
{
    name : "Jenny Doe",
    email: "jennydoe@gmail.com",
    role:  "Panding",
    date:  "04 Aug,2026",
    status: "pending",
},
];


    const [search, setSearch] = useState("");

    const filteredOwners = ownersData.filter((owner) =>
        owner.name.toLowerCase().includes(search.toLowerCase()) ||
        owner.email.toLowerCase().includes(search.toLowerCase())
    );

   return (
        <div className="dashboard">

            <aside className="sidebar">

                <div className="logo">
                  <img src={Logo} alt="Logo" className="navLogo" />
                </div>

                <nav className="sidebar-menu">

                    <a href="#" className="menu-item active">
                        <span className="dashboard-icon"><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M22 4.4A2.4 2.4 0 0 0 19.6 2h-3.2A2.4 2.4 0 0 0 14 4.4v5.2a2.4 2.4 0 0 0 2.4 2.4h3.2A2.4 2.4 0 0 0 22 9.6zm0 14a2.4 2.4 0 0 0-2.4-2.4h-3.2a2.4 2.4 0 0 0-2.4 2.4v1.2a2.4 2.4 0 0 0 2.4 2.4h3.2a2.4 2.4 0 0 0 2.4-2.4zm-12-14A2.4 2.4 0 0 0 7.6 2H4.4A2.4 2.4 0 0 0 2 4.4v1.2A2.4 2.4 0 0 0 4.4 8h3.2A2.4 2.4 0 0 0 10 5.6zm0 10A2.4 2.4 0 0 0 7.6 12H4.4A2.4 2.4 0 0 0 2 14.4v5.2A2.4 2.4 0 0 0 4.4 22h3.2a2.4 2.4 0 0 0 2.4-2.4z"></path></svg></span>
                        <span>Dashboard</span>
                    </a>

                    <a href="#" className="menu-item">
                        <span className="dashboard-icon"><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 20 20"><path fill="#fff" d="M9.993 10.573a4.5 4.5 0 1 0 0-9a4.5 4.5 0 0 0 0 9M10 0a6 6 0 0 1 3.04 11.174c3.688 1.11 6.458 4.218 6.955 8.078c.047.367-.226.7-.61.745c-.383.045-.733-.215-.78-.582c-.54-4.19-4.169-7.345-8.57-7.345c-4.425 0-8.101 3.161-8.64 7.345c-.047.367-.397.627-.78.582c-.384-.045-.657-.378-.61-.745c.496-3.844 3.281-6.948 6.975-8.068A6 6 0 0 1 10 0"></path></svg></span>
                        <span>Users</span>
                    </a>

                    <a href="#" className="menu-item">
                        <span className="dashboard-icon"><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="none" stroke="#fff" strokeLinecap="round" strokeWidth={2} d="M4 7h16M4 20h16M8 10v1m0 3v1m4-5v1m4-1v1m0 3v1m2-8V5a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2zm-4.5 13v-3.5a1.5 1.5 0 0 0-3 0V20zM5 7h14v13H5z"></path></svg></span>
                        <span>Hotel Owners</span>
                    </a>

                    <a href="#" className="menu-item">
                        <span className="dashboard-icon"><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="#fff" d="M7.833 18c1.4 0 2.62.819 3.195 2.028a1 1 0 0 1-1.806.86A1.54 1.54 0 0 0 7.833 20H3a1 1 0 1 1 0-2zM21 18a1 1 0 1 1 0 2h-4.833c-.567 0-1.135.357-1.389.889a1 1 0 0 1-1.806-.86A3.58 3.58 0 0 1 16.167 18z"></path><path fill="#fff" fillRule="evenodd" d="M8.889 3.006a4.33 4.33 0 0 1 3.11 1.564A4.33 4.33 0 0 1 15.333 3H22a1 1 0 0 1 1 1v12.001a1 1 0 0 1-1 1L15.333 17c-.658 0-1.085.162-1.372.354a1.93 1.93 0 0 0-.65.76A3.1 3.1 0 0 0 13 19.33v.009l-.005.097a1 1 0 0 1-1.99 0L11 19.334v-.005l-.004-.068a3.1 3.1 0 0 0-.305-1.151a1.9 1.9 0 0 0-.64-.76c-.28-.19-.698-.35-1.343-.35H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6.667zM11 5v12.334h2V5z" clipRule="evenodd"></path></svg></span>
                        <span>Booking Details</span>
                    </a>

                    <div className="menu-spacer"></div>

                    <a href="#" className="menu-item">
                        <span className="dashboard-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M11 18H9v-2h2zM10 2c1.497 0 2.76.433 3.66 1.268c.905.84 1.34 1.994 1.34 3.232c0 1.182-.443 2.007-1.094 2.638a6.7 6.7 0 0 1-.95.742c-.363.241-.587.373-.923.602C11.351 10.948 11 11.86 11 13v1H9v-1c0-1.455.443-3.17 1.905-4.169c.3-.204.71-.461.94-.615c.281-.187.498-.349.67-.515c.297-.287.485-.607.485-1.201c0-.762-.258-1.357-.7-1.768C11.853 4.317 11.117 4 10 4C7.98 4 7 5.636 7 6.5v1H5v-1C5 4.614 6.794 2 10 2"></path></svg></span>
                        <span>Help</span>
                    </a>

                    <a href="#" className="menu-item">
                        <span className="dashboard-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M19.9 12.66a1 1 0 0 1 0-1.32l1.28-1.44a1 1 0 0 0 .12-1.17l-2-3.46a1 1 0 0 0-1.07-.48l-1.88.38a1 1 0 0 1-1.15-.66l-.61-1.83a1 1 0 0 0-.95-.68h-4a1 1 0 0 0-1 .68l-.56 1.83a1 1 0 0 1-1.15.66L5 4.79a1 1 0 0 0-1 .48L2 8.73a1 1 0 0 0 .1 1.17l1.27 1.44a1 1 0 0 1 0 1.32L2.1 14.1a1 1 0 0 0-.1 1.17l2 3.46a1 1 0 0 0 1.07.48l1.88-.38a1 1 0 0 1 1.15.66l.61 1.83a1 1 0 0 0 1 .68h4a1 1 0 0 0 .95-.68l.61-1.83a1 1 0 0 1 1.15-.66l1.88.38a1 1 0 0 0 1.07-.48l2-3.46a1 1 0 0 0-.12-1.17ZM18.41 14l.8.9l-1.28 2.22l-1.18-.24a3 3 0 0 0-3.45 2L12.92 20h-2.56L10 18.86a3 3 0 0 0-3.45-2l-1.18.24l-1.3-2.21l.8-.9a3 3 0 0 0 0-4l-.8-.9l1.28-2.2l1.18.24a3 3 0 0 0 3.45-2L10.36 4h2.56l.38 1.14a3 3 0 0 0 3.45 2l1.18-.24l1.28 2.22l-.8.9a3 3 0 0 0 0 3.98m-6.77-6a4 4 0 1 0 4 4a4 4 0 0 0-4-4m0 6a2 2 0 1 1 2-2a2 2 0 0 1-2 2"></path></svg></span>
                        <span>Setting</span>
                    </a>

                </nav>

            </aside>


            <main className="dashboard-main">

                  <header className="top-header">

                    <div>
                        <h2>Hello, Elise Mwanza</h2>
                        <p>Have a nice day</p>
                    </div>

                    <div className="admin-profile">

                        <button className="notification">
                                
                            <span><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M13 3a1 1 0 1 0-2 0v.75h-.557A4.214 4.214 0 0 0 6.237 7.7l-.221 3.534a7.4 7.4 0 0 1-1.308 3.754a1.617 1.617 0 0 0 1.135 2.529l3.407.408V19a2.75 2.75 0 1 0 5.5 0v-1.075l3.407-.409a1.617 1.617 0 0 0 1.135-2.528a7.4 7.4 0 0 1-1.308-3.754l-.221-3.533a4.214 4.214 0 0 0-4.206-3.951H13zm-2.25 16a1.25 1.25 0 1 0 2.5 0v-.75h-2.5z" clipRule="evenodd"></path></svg></span>
                        </button>

                        <div className="admin-divider"></div>

                        <div className="admin-info">
                            <strong>Elise Mwanza</strong>
                            <small>Admin</small>
                        </div>

                        <span className="dropdown-arrow">
                            ⌄
                        </span>

                    </div>

                </header>
            
             <section className="dashboard-content">

                    <h1>Admin Dashboard</h1>

                    <div className="dashboard-controls">

                        <div className="search-box">
                             <span>⌕</span>

                            <input
                                type="text"
                                placeholder="Search"
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                            />

                        </div>


                        <button className="add-owner">
                            Add Owner <strong>+</strong>
                        </button>


                        <button className="control-button">
                            Sort by <span>⌄</span>
                        </button>


                        <button className="control-button">
                            Saved search <span>⌄</span>
                        </button>


                        <button className="filter-button">
                            ☷
                        </button>

                    </div>

                    <section className="owners-card">

                        <div className="table-title">
                            Venue Owners
                        </div>


                        <div className="table-header">

                            <div>Name</div>

                            <div>Role</div>

                            <div>Create Date</div>

                            <div>Action</div>

                        </div>


                        <div className="table-body">

                            {filteredOwners.map((owner, index) => (

                                <div
                                    className="table-row"
                                    key={index}
                                >


                                    <div className="owner-name">

                                        <strong>
                                            {owner.name}
                                        </strong>

                                        <span>
                                            {owner.email}
                                        </span>

                                    </div>

                                    <div>

                                        <span
                                            className={`role-badge ${
                                                owner.status === "pending"
                                                    ? "pending"
                                                    : ""
                                            }`}
                                        >
                                            {owner.role}
                                        </span>

                                    </div>


                                    <div className="create-date">
                                        {owner.date}
                                    </div>

                                    <div className="actions">

                                        <button title="Edit">
                                            <span><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 80 80"><g fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round"><path d="M38.4 20.742H14a2 2 0 0 0-2 2v44a2 2 0 0 0 2 2h44a2 2 0 0 0 2-2v-24.4"></path><path d="M68.015 21.897c.78-.78.78-2.044 0-2.824l-5.657-5.656a2.003 2.003 0 0 0-2.833 0L30.7 42.242a16 16 0 0 0-4.555 9.266l-.433 3.358a.758.758 0 0 0 .848.849l3.359-.433a16 16 0 0 0 9.266-4.555zm-15.869-1.093l8.48 8.48"></path></g></svg></span>
                                        </button>

                                        <button title="Delete">
                                            <span><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1"></path></svg></span>
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </section>
                </section>
                <Footer />
            </main>

        </div>
    );
};
export default Dashboard;

