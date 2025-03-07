import Sidebar from "./Components/Sidebar"
import Header from "./Components/Header"
import Login from "./auth/Login";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContentBox from "./Components/ContentBox";

import { FrappeProvider, useFrappeGetDocList, useFrappeAuth} from 'frappe-react-sdk'
import SignInPage from "./auth/SignInPage";
import OnboardingPage from "./auth/OnboardingPage";

// function App(){
//   return(
//     <div className="dashboardContainer">
//         <Sidebar/>
//         <main className="content">
//             <Header/>
//             <div className="innerContent">
//                 <SummaryCards />
//                 <section className="dashboardContent">
//                     <Birthdays/>
//                     <EmployeeChart/>
//                 </section>
//             </div>
//             <Footer/>
//         </main>
//     </div>
//   );
// }

function App() {
  const URL = import.meta.env.VITE_REACT_APP_URL;

  // const getSessionId = async () => {
  //   try {
  //     const response = await fetch(`${URL}api/method/get_session`, {
  //       credentials: "include",
  //     });
  //     const data = await response.json();
  //     console.log("Get session Session ID:", data.sid);
  //   } catch (error) {
  //     console.error("Error fetching session ID:", error);
  //   }
  // };

  // const getSessionId = async () => {
  //     try {
  //         const response = await fetch(`${URL}api/method/get_session`, {
  //             credentials: "include",
  //         });
  //         const data = await response.json();
          
  //         if (data.sid) {
  //             console.log("Get Session ID:", data.sid);
  //             localStorage.setItem("sid", data.sid); // Store in local storage
  //         } else {
  //             console.warn("No session ID received");
  //         }
  //     } catch (error) {
  //         console.error("Error fetching session ID:", error);
  //     }
  // };
  // // if(!localStorage.getItem("sid")){
  // //   getSessionId();
  // // }

  // getSessionId();

  // const sessionId = localStorage.getItem("sid");
  // console.log("App session id",sessionId);

  // const {currentUser, getUserCookie, login, logout} = useFrappeAuth()

  // const [isLoggedIn, setIsLoggedIn] = useState(() => {
  //   // Check local storage for persisted login state
  //   return localStorage.getItem("isLoggedIn") === "true";
  // });

  // const handleLoginSuccess = () => {
  //   setIsLoggedIn(true); // Set login state to true after successful login
  //   localStorage.setItem("isLoggedIn", "true"); // Persist login state
  // };
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check local storage for persisted login state
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [userRoles, setUserRoles] = useState([]); // Store user roles here

  const [loggedInUser, setLoggedInUser] = useState("");

  const handleLoginSuccess = async (userData) => {
    setIsLoggedIn(true); // Set login state to true after successful login
    localStorage.setItem("isLoggedIn", "true"); // Persist login state
    console.log("userData.emal: ",userData.email);
    setLoggedInUser(userData.email);
    localStorage.setItem("loggedInUser", JSON.stringify(userData.email));
    await fetchUserRoles(userData.email); // Fetch roles after login
    console.log("user: ",userData.email)
  };

  const fetchUserRoles = async (email) => {
    try {
        // const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
        //     const [key, value] = cookie.split("=");
        //     acc[key] = value;
        //     return acc;
        // }, {});

        // const sid = cookies.sid;
        // const sid = localStorage.getItem("sid")

        // if (!sid) return;

        const response = await fetch(`${URL}api/method/get_test_2`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user: email }),
        });

        if (response.ok) {
            const data = await response.json();
            setUserRoles(data.message.roles); // Store in state
            localStorage.setItem("userRoles", JSON.stringify(data.message.roles)); // Store in localStorage
        } else {
            console.error("Failed to fetch roles");
          }
      } catch (error) {
          console.error("Error fetching roles:", error);
      }
  };

  // Restore roles from localStorage on page reload
  useEffect(() => {
      const storedRoles = JSON.parse(localStorage.getItem("userRoles")) || [];
      setUserRoles(storedRoles);
      const storedUser = JSON.parse(localStorage.getItem("loggedInUser")) || "";
    setLoggedInUser(storedUser); // Restore loggedInUser
  }, []);

  const handleLogout = async () => {
    // try {
    //   const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
    //     const [key, value] = cookie.split("=");
    //     acc[key] = value;
    //     return acc;
    //   }, {})
    try{

      const logged_in_user = localStorage.getItem("isLoggedIn")
      if (logged_in_user) {
        // Make an API call to ERPNext's logout endpoint with the session ID
        const response = await fetch(`${URL}api/method/logout`, {
          method: "GET", // Since you're passing SID in the URL, you might want to use GET method
          credentials: "include", // Ensure cookies are included in the request
        });
  
        if (response.ok) {
          console.log("Server session terminated successfully.");
  
          // Clear the session cookie explicitly
          localStorage.removeItem("sid");
          document.cookie = "sid=; Path=/; Domain=49.50.93.228; Expires=Thu, 01 Jan 1970 00:00:00 UTC;";
          document.cookie = "sid=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  
          // Reset application state
          setIsLoggedIn(false);
          localStorage.removeItem("isLoggedIn");
  
          console.log("Logged out successfully and session cookie destroyed.");
          window.location.reload();
        } else {
          console.error("Logout failed on the server.");
        }
      } else {
        // Reset application state
        setIsLoggedIn(false);
        localStorage.removeItem("sid");
        localStorage.removeItem("isLoggedIn");
        console.error("Session ID not found.");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  // Check if the user has the HR User role
  const isHRUser = userRoles.includes("HR User");

  return (
    <div>
      <FrappeProvider
        socketPort={import.meta.env.VITE_SOCKET_PORT}
        siteName={import.meta.env.VITE_SITE_NAME}
      >
      {isLoggedIn ? (
        <div className="dashboardContainer">
          <Sidebar onLogout={handleLogout} roles={userRoles} />
          <main className="content">
            <Header onLogout={handleLogout} />
            <div className="innerContent">
              <ContentBox loggedInUser={loggedInUser} onLogout={handleLogout} roles={userRoles} />
              {/* Conditionally render Birthdays and EmployeeChart for HR Users */}
              {/* {isHRUser && (
                <section className="dashboardContent">
                  <Birthdays />
                  <EmployeeChart />
                </section>
              )} */}

            </div>
            {/* <Footer /> */}
          </main>
        </div>
      ) : (
        <Router>
          <Routes>
            <Route path="/scope" element={<OnboardingPage/>} />
            <Route path="/signin" element={<SignInPage onLoginSuccess={handleLoginSuccess} />} />
          </Routes>
        </Router>
      )}
      </FrappeProvider>
      
    </div>
  );
}


// function App(){
//   return(
//     <>
//       <Login/>
//     </>
//   )
// }

// function App(){
//   return(
//     <div>
//       <FrappeProvider
//         socketPort={import.meta.env.VITE_SOCKET_PORT}
//         siteName={import.meta.env.VITE_SITE_NAME}
//       >
//         <div>
//           <TestComponent/>
//         </div>

//       </FrappeProvider>
//     </div>
//   )
// }


// const TestComponent = () => {
//   const { data} = useFrappeGetDocList("User");

//   return <div></div>;
// }

export default App
