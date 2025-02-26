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


// function Sidebar({ onLogout, roles }) {
//     const URL = import.meta.env.VITE_REACT_APP_URL;

//     console.log("roles:",roles)

//     const handleCardClick = (item) => {
//         const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
//             const [key, value] = cookie.split("=");
//             acc[key] = value;
//             return acc;
//         }, {});
//         const sid = cookies.sid;
//         if (sid) {
//             // Format item for URL
//             let formattedItem = item.toLowerCase().replace(/\s+/g, '-');
//             let url = `${URL}app/${encodeURIComponent(formattedItem)}?sid=${sid}`;
//             window.open(url, "_blank"); // Open in a new tab
//         } else {
//             alert("Session ID not found. Please log in again.");
//         }
//     };

//     return (
//         <aside className="sideBar">
//             <div className="logo">
//                 <img src={logo} alt="HM LTD" onClick={() => { window.location.href = "/";}}/>
//             </div>
//             <nav className="menu">
//                 <ul>
//                     <li className="active" onClick={() => { window.location.href = "/";}}><img src={home} alt="Home" /><span>Home</span></li>
//                     <li onClick={ () => handleCardClick("Employee")} ><img src={employee_directory}/><span>Employee List</span></li>
//                     <li onClick={ () => handleCardClick("Leave Application")} ><img src={overview} alt="Overview" /><span>Leave Application</span></li>
//                     <li onClick={ () => handleCardClick("Designation")} ><img src={analyticshub} alt="AnalyticsHub" /><span>Designation</span></li>
//                     <li onClick={ () => handleCardClick("Department")} ><img src={organization_chart}/><span>Department</span></li>
//                     <li onClick={ () => handleCardClick("User")} ><img src={information}/><span>Users</span></li>
//                     <li onClick={ () => handleCardClick("Salary Slip")} ><img src={admin}/><span>Salary Slip</span></li>
//                     <li onClick={ () => handleCardClick("DocType")} ><img src={setup}/><span>Setup</span></li>
//                     <li className="logout" onClick={onLogout}><span>Log Out</span></li>
//                 </ul>
//             </nav>
//             <footer>
//                 <p>© HM LTD</p>
//                 <p><span>Powered By</span>HM LTD</p>
//             </footer>
//         </aside>
//     );
// }

function Sidebar({ onLogout, roles }) {
    const URL = import.meta.env.VITE_REACT_APP_URL;

    const isHRUser = roles.includes("HR User"); // Use roles prop directly

    console.log("Roles:", roles);
    console.log("HR User:", isHRUser);

    const handleCardClick = (item) => {
        const sid = localStorage.getItem("sid")
        if (sid) {
            let formattedItem = item.toLowerCase().replace(/\s+/g, '-');
            let url = `${URL}app/${encodeURIComponent(formattedItem)}?sid=${sid}`;
            window.open(url, "_blank"); 
        } else {
            alert("Session ID not found. Please log in again.");
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



// function Sidebar({ onLogout, roles }) {
//     const URL = import.meta.env.VITE_REACT_APP_URL;
  
//     // Sidebar items based on roles
//     const sidebarItems = [
//       { name: "Home", icon: home, url: "/" },
//       { name: "Employee List", icon: employee_directory, url: "employee" },
//       { name: "Leave Application", icon: overview, url: "leave-application" },
//       { name: "Designation", icon: analyticshub, url: "designation" },
//       { name: "Department", icon: organization_chart, url: "department" },
//       { name: "Users", icon: information, url: "user" },
//       { name: "Salary Slip", icon: admin, url: "salary-slip" },
//       { name: "Setup", icon: setup, url: "doctype" },
//     ];

//     console.log(roles)
  
//     // Filter sidebar items based on roles (example)
//     const visibleItems = sidebarItems.filter(item => {
//       if (roles.includes("Admin")) {
//         return true; // Admin can see all items
//       }
  
//       if (roles.includes("Manager") && item.name !== "Salary Slip") {
//         return true; // Manager can see all except Salary Slip
//       }
  
//       if (roles.includes("Employee") && item.name === "Employee List") {
//         return true; // Employee can only see Employee List
//       }
  
//       return false; // All other items are hidden
//     });
  
//     const handleCardClick = (item) => {
//       const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
//         const [key, value] = cookie.split("=");
//         acc[key] = value;
//         return acc;
//       }, {});
//       const sid = cookies.sid;
//       if (sid) {
//         // Format item for URL
//         let formattedItem = item.toLowerCase().replace(/\s+/g, '-');
//         let url = `${URL}app/${encodeURIComponent(formattedItem)}?sid=${sid}`;
//         window.open(url, "_blank"); // Open in a new tab
//       } else {
//         alert("Session ID not found. Please log in again.");
//       }
//     };
  
//     return (
//       <aside className="sideBar">
//         <div className="logo">
//           <img src={logo} alt="HM LTD" onClick={() => { window.location.href = "/"; }} />
//         </div>
//         <nav className="menu">
//           <ul>
//             {visibleItems.map(item => (
//               <li key={item.name} onClick={() => handleCardClick(item.name)}>
//                 <img src={item.icon} alt={item.name} />
//                 <span>{item.name}</span>
//               </li>
//             ))}
//             <li className="logout" onClick={onLogout}>
//               <span>Log Out</span>
//             </li>
//           </ul>
//         </nav>
//         <footer>
//           <p>© HM LTD</p>
//           <p><span>Powered By</span> HM LTD</p>
//         </footer>
//       </aside>
//     );
//   }
  

export default Sidebar;