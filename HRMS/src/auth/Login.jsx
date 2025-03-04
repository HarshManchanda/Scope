import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // For password toggle icon
import logo from "../assets/images/vprocure-logo.svg";
import { useFrappeAuth } from "frappe-react-sdk";

function Login({ onLoginSuccess }) {
  const URL = import.meta.env.VITE_REACT_APP_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Toggle state for password

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
        // const test = response.headers.get("Set-Cookie");
        // console.log("test set cookie: ",test)
        console.log("Login successful:", data);
        // getSessionId();
        // console.log("Check: ",check);

        // const sessionId = data.sid || "";
        // console.log("session id: ",sessionId)
        // localStorage.setItem("sid",sessionId)
        // if (sessionId) {
        //   document.cookie = `sid=${sessionId}`;
        // }

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

