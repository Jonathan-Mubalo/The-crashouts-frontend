import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import "./Dashboard.css"
import Footer from "../components/Footer"
import Logo from "../assets/Logo.png"

const Dashboard = () => {

    // IT IS THE STATE VARIABLE THAT WILL STORE THE LIST OF ALL OF THE USERS THAT ARE CURRENTLY IN OUR DATABASE
    const [usersList, setUsersList] = useState([]);

    // STATE VARIABLE THAT IS USED TO STORE THE SPECIFIC USERS THAT AN ADMIN HAS SEARCHED FOR
    const [ filteredUsers, setFilteredUsers] = useState([]);

    const [ myProfile, setMyProfile ] = useState({});

    const search = useRef();


     // USEEFFECT USED TO COLLECT AND STORE ALL OF THE INFORMATION OF THE CURRENT ADMIN IN A STATE VARIABLE

    useEffect(() => {
        const getMyProfile = async () => {
            try {

                const email = JSON.parse(sessionStorage.getItem("accessToken"));
                
                const response = await fetch(`//localhost:3000/myProfile/${email}`);

                const data = await response.json();

                console.log("My collected profile in my useEffect: ", data.userProfileInfo);

                // USESTATE THAT WILL STORE THE ADMINS PROFILE
                setMyProfile( ()=>{
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

            // USESTATE THAT WILL STORE ALL OF THE USERS THAT HAVE AN ACCOUNT ON OUT APPLICATION
            setUsersList(() => {
                return data.message;
            });
                // USESTATE THAT WILL STORE ALL OF THE USERS THAT YOU ARE SPECIFICALLY SEARCHING FOR
                   setFilteredUsers( ()=>{
                    return data.message;
                })

            } catch (error) {
                console.error(error);
            }
        }

        getAllUsers();
    }, []);

    


   



    const handleFilteredUsers = () => {

        const filter = usersList.filter( (user)=>{ return user.userName.includes(search.current.value) } );
        setFilteredUsers( ()=>{ return filter } );

    }
        

    return (
        // <div className="dashboard">



            <main className="dashboard-main">

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
                                onChange={ handleFilteredUsers }
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

                            <div>Create Date</div>

                            <div>Action</div>

                        </div>




                        <div className="table-body">


                    {filteredUsers && filteredUsers.map( (user,index)=>{
                        return(
                    
                    





           
                    

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

                                        <span
                                            // className={`role-badge ${owner.status === "pending"
                                            //         ? "pending"
                                            //         : ""
                                            //     }`}
                                        >
                                            {user.role}
                                        </span>

                                    </div>


                                    <div className="create-date">
                                        {user.createdAt}
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

