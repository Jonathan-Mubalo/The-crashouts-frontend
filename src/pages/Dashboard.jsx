import Navbar from "../components/Navbar";
import "./Dashboard.css"
import React from 'react'
import { useState } from "react";

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
    role:  "Ownwe",
    date:  "02 Aug,2026",
    status: "active",
},
{
    name : "Jenny Doe",
    email: "jennydoe@gmail.com",
    role:  "Panding",
    date:  "04 Aug,2026",
    status: "panding",
},
];


    const [search, setSearch] = useState("");

    const filteredOwners = ownersData.filter((owner) =>
        owner.name.toLowerCase().includes(search.toLowerCase()) ||
        owner.email.toLowerCase().includes(search.toLowerCase())
    );

    return(
        <>
        <div className="dashboard">
            its working
        </div>
        </>
    )

}

export default Dashboard;

