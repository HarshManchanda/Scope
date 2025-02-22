import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // For password toggle icon
import logo from "../assets/images/vprocure-logo.svg";

// import "./Login.css"; // Import the CSS file

// function Login() {
//     const URL = import.meta.env.VITE_REACT_APP_URL;

//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
  
//     const handleLogin = async (e) => {
//       e.preventDefault();
//       setError("");
  
//       if (!email || !password) {
//         setError("Email and Password are required!");
//         return;
//       }
  
//       try {
//         const response = await fetch(`${URL}api/method/login`, {
//           method: "POST",
//           headers: {
//               'Accept': 'application/json',
//               'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ usr: email, pwd: password }),
//           credentials: "include",
//         });
  
//         // if (!response.ok) {
//         //   throw new Error("Invalid credentials");
//         // }
//         if (response.ok) {
//           const data = await response.json();
//           const sid = data.sid;
//           console.log("Login successful:", data);
// // ${URL}${homePage}?sid=${sid}
//           if(sid){
//             const homePage = data.home_page || "/app";
//             const state_emp = "Active"
//             window.location.href = `${URL}app/employee?status=${state_emp}&sid=${sid}`;
//           }else {
//             alert("Session ID not found in response. Login may not work as expected.");
//           }
//         } else {
//           alert("Login failed. Please check your credentials.");
//         }
  
//       } catch (err) {
//         setError(err.message);
//       }
//     };
  
//     return (
//       <div className="login-container">
//         <div className="login-form-container">
//           <h2 className="login-heading">Login</h2>
//           {error && <p className="login-error">{error}</p>}
//           <form onSubmit={handleLogin}>
//             <div className="login-form-group">
//               <label htmlFor="email" className="login-label">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 className="login-input"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>
//             <div className="login-form-group">
//               <label htmlFor="password" className="login-label">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 className="login-input"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter your password"
//                 required
//               />
//             </div>
//             <button type="submit" className="login-button">
//               Login
//             </button>
//           </form>
//         </div>
//       </div>
//     );
//   }
  
function Login({ onLoginSuccess }) {
  const URL = import.meta.env.VITE_REACT_APP_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Toggle state for password

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and Password are required!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${URL}api/method/login`, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ usr: email, pwd: password }),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);

        const sessionId = data.sid || "";
        if (sessionId) {
          document.cookie = `sid=${sessionId}`;
        }

        setTimeout(() => {
          onLoginSuccess({ email });
          setLoading(false);
        }, 1500);
      } else {
        setLoading(false);
        alert("Login failed. Please check your credentials.");
      }
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <img src={logo} alt="VProcure Logo" className="login-logo" />
        <h2 className="login-heading">Login</h2>
        {error && <p className="login-error">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="login-form-group">
            <label htmlFor="email" className="login-label">Email</label>
            <input
              type="email"
              id="email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>
          <div className="login-form-group password-wrapper">
            <label htmlFor="password" className="login-label">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? <span className="loading-spinner"></span> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;