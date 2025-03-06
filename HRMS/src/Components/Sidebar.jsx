import logo from '../assets/images/vprocure-logo.svg'
import home from '../assets/images/home.svg'
import overview from '../assets/images/overview.svg'
import analyticshub from '../assets/images/analytics-hub.svg'
import employee_directory from '../assets/images/employee-directory.svg'
import organization_chart from '../assets/images/organization-chart.svg'
import information from '../assets/images/information.svg'
import admin from '../assets/images/admin.svg'
import setup from '../assets/images/setup.svg'
import statutory from '../assets/images/statutory.svg'

import React, { useState, useEffect } from "react";

function Sidebar({ onLogout, roles }) {
    const URL = import.meta.env.VITE_REACT_APP_URL;

    const isHRUser = roles.includes("HR User"); // Use roles prop directly

    console.log("Roles:", roles);
    console.log("HR User:", isHRUser);

    const handleCardClick = (item) => {
        const logged_in_user = localStorage.getItem("isLoggedIn")
        if (logged_in_user) {
            let formattedItem = item.toLowerCase().replace(/\s+/g, '-');
            let url = `${URL}app/${encodeURIComponent(formattedItem)}`;
            window.open(url, "_blank"); 
        } else {
            alert("Not Logged in. Please log in again.");
        }
    };

    return (
        <aside className="sideBar">
            <div className="logo">
                <img src={logo} alt="HM LTD" onClick={() => { window.location.href = "/"; }} />
            </div>
            <nav className="menu">
                <ul>
                    <li className="active" onClick={() => { window.location.href = "/"; }}>
                        <img src={home} alt="Home" />
                        <span>Home</span>
                    </li>
                    <li onClick={() => handleCardClick("Leave Application")}>
                        <img src={overview} alt="Overview" />
                        <span>Leave Application</span>
                    </li>
                    <li onClick={() => handleCardClick("User")}>
                        <img src={information} />
                        <span>Users</span>
                    </li>
                    <li onClick={() => handleCardClick("Salary Slip")}>
                        <img src={admin} />
                        <span>Salary Slip</span>
                    </li>

                    {isHRUser && (
                        <>
                            <li onClick={() => handleCardClick("Employee")}>
                                <img src={employee_directory} />
                                <span>Employee List</span>
                            </li>
                            <li onClick={() => handleCardClick("Designation")}>
                                <img src={analyticshub} alt="AnalyticsHub" />
                                <span>Designation</span>
                            </li>
                            <li onClick={() => handleCardClick("Department")}>
                                <img src={organization_chart} />
                                <span>Department</span>
                            </li>
                            <li onClick={() => handleCardClick("DocType")}>
                                <img src={setup} />
                                <span>Setup</span>
                            </li>
                        </>
                    )}

                    <li className="logout" onClick={onLogout}>
                        <span>Log Out</span>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}  

export default Sidebar;