import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import "./Dashboard.css"
import Footer from "../components/Footer"
import Logo from "../assets/Logo.png"

const Dashboard = () => {

    // IT IS THE STATE VARIABLE THAT WILL STORE THE LIST OF ALL OF THE USERS THAT ARE CURRENTLY IN OUR DATABASE
    const [usersList, setUsersList] = useState([]);

    // STATE VARIABLE THAT IS USED TO STORE THE SPECIFIC USERS THAT AN ADMIN HAS SEARCHED FOR
    const [filteredUsers, setFilteredUsers] = useState([]);

    const [myProfile, setMyProfile] = useState({});

    // USED TO HANDLE THE SEARCH FUNCTIONALITY BY USING THE INCLUDES METHOD
    const search = useRef();

    // USED TO DISPLAY THE BUTTONS THAT WILL BE USED TO CHANGE A USERS ROLE
    const [currentRoleBtn, setCurrentRoleBtn] = useState();

    // USEEFFECT USED TO COLLECT AND STORE ALL OF THE INFORMATION OF THE CURRENT ADMIN IN A STATE VARIABLE
    useEffect(() => {
        const getMyProfile = async () => {
            try {

                const email = JSON.parse(sessionStorage.getItem("accessToken"));

                const response = await fetch(`//localhost:3000/myProfile/${email}`);

                const data = await response.json();

                // console.log("My collected profile in my useEffect: ", data.userProfileInfo);

                // USESTATE THAT WILL STORE THE ADMINS PROFILE
                setMyProfile(() => {
                    return data.userProfileInfo;
                })


            } catch (error) {
                console.error(error);
            }
        }

        getMyProfile();
    }, []);

    // USEEFFECT USED TO COLLECT AND STORE ALL OF THE USERS FROM THE DATABASE IN A STATE VARIABLE

    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
                const email = JSON.parse(sessionStorage.getItem("accessToken"));

                const response = await fetch(`${API_URL}/getAllUsers/${email}`);

                const data = await response.json();

                console.log("Number of users collected: ", data.message.length);
                console.log("Users collected: ", data.message);

                // USESTATE THAT WILL STORE ALL OF THE USERS THAT HAVE AN ACCOUNT ON OUT APPLICATION
                setUsersList(() => {
                    return data.message;
                });

                // USESTATE THAT WILL STORE ALL OF THE USERS THAT YOU ARE SPECIFICALLY SEARCHING FOR
                setFilteredUsers(() => {
                    return data.message;
                })

            } catch (error) {
                console.error(error);
            }
        }

        getAllUsers();
    }, []);

    // FUNCTION USED TO SEARCH FOR A USER BY NAME
    const handleFilteredUsers = () => {

        const filter = usersList.filter((user) => { return user.userName.toLowerCase().includes(search.current.value.toLowerCase()) });
        setFilteredUsers(() => { return filter });

    }

    const handleUserRoleChange = async (userIndex, newRole) => {

        try {

            const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
            const email = JSON.parse(sessionStorage.getItem("accessToken"));

            const response = await fetch(`${API_URL}/changeUserRoles/${email}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userName: usersList[userIndex]["userName"],
                    role: newRole
                })
            });

            const data = response.json();
            if (response.status !== 200) {
                return alert(data.message)
            }

            // UPDATING THE USER ROLE BY STORING THE STATE INSIDE A VARIABLE 
            const currentUsersList = usersList;

            // UPDATING THE USERS ROLE INSIDE THE STATE VARIABLE SO THAT THE FRONT END CAN ALSO BE UPDATED
            currentUsersList[userIndex]["role"] = newRole;

            // UPDATING THE USERSLIST SO THAT THE PAGE DISPLAY IS UP TO DATE
            setUsersList( ()=>{ return [...currentUsersList] })

            console.log("checking to see if the database was updated", data.message)
            console.log("checking to see whose informaton was updated", data.changedRole)




        }
        catch (error) {
            console.error(error)
        }
    }

    return (
        // <div className="dashboard">



        <main className="dashboard-main">
            <Navbar />
            <header className="top-header">

                <div>
                    <h2>Hello, {myProfile && myProfile.userName}</h2>
                    {/* <p>Have a nice day</p> */}
                </div>

                <div className="admin-profile">

                    <button className="notification">

                        <span><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M13 3a1 1 0 1 0-2 0v.75h-.557A4.214 4.214 0 0 0 6.237 7.7l-.221 3.534a7.4 7.4 0 0 1-1.308 3.754a1.617 1.617 0 0 0 1.135 2.529l3.407.408V19a2.75 2.75 0 1 0 5.5 0v-1.075l3.407-.409a1.617 1.617 0 0 0 1.135-2.528a7.4 7.4 0 0 1-1.308-3.754l-.221-3.533a4.214 4.214 0 0 0-4.206-3.951H13zm-2.25 16a1.25 1.25 0 1 0 2.5 0v-.75h-2.5z" clipRule="evenodd"></path></svg></span>
                    </button>

                    <div className="admin-divider"></div>

                    <div className="admin-info">
                        <strong>{myProfile && myProfile.userName}</strong>
                        <small>{myProfile && myProfile.role}</small>
                    </div>



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
                            ref={search}
                            onChange={handleFilteredUsers}
                        />

                    </div>

                </div>

                <section className="owners-card">

                    <div className="table-title">
                        Venue Owners
                    </div>

                    <div className="table-header">

                        <div>Name</div>

                        <div>Role</div>

                        <div>Date created</div>

                        <div>Change role</div>

                    </div>




                    <div className="table-body">


                        {filteredUsers && filteredUsers.map((user, index) => {
                            return (

                                <div
                                    className="table-row"
                                    key={index}
                                >


                                    <div className="owner-name">

                                        <strong>
                                            {user.userName}
                                        </strong>

                                        <span>
                                            {user.email}
                                        </span>

                                    </div>

                                    <div>

                                        <span>
                                            {user.role}
                                        </span>

                                    </div>


                                    <div className="create-date">
                                        {user.createdAt}
                                    </div>

                                    <div className="actions">


                                        {(user.role === "admin") ?
                                            <><button className="dashboard_userRoleBtn" onClick={()=>{ return handleUserRoleChange(index,"customer") } }>
                                                User
                                            </button>
                                                <button className="dashboard_userRoleBtn" onClick={()=>{ return handleUserRoleChange(index,"manager") } }>
                                                    Manager
                                                </button> </> :


                                            (user.role === "manager") ?
                                                <> <button className="dashboard_userRoleBtn" onClick={()=>{ return handleUserRoleChange(index,"customer") } }>
                                                    User
                                                </button>
                                                    <button className="dashboard_userRoleBtn" onClick={()=>{ return handleUserRoleChange(index,"admin") } }>
                                                        Admin
                                                    </button></>

                                                : (
                                                    <> <button className="dashboard_userRoleBtn" onClick={()=>{ return handleUserRoleChange(index,"manager") } }>
                                                        Manager
                                                    </button>
                                                        <button className="dashboard_userRoleBtn" onClick={()=>{ return handleUserRoleChange(index,"admin") } }>
                                                            Admin
                                                        </button> </>
                                                )

                                        }

                                        {/* <button title="Edit">
                                            ...
                                        </button>

                                        <button title="Delete">
                                            ...
                                        </button> */}

                                    </div>

                                </div>




                            )
                        })}

                    </div>

                </section>
            </section>
            <Footer />
        </main>

        // </div>
    );
};
export default Dashboard;

