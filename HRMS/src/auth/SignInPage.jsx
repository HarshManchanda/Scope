import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // For password toggle icon
import logo from "../assets/images/sign-in-logo.svg";
import signin from "../assets/images/sign-in-arrow.svg";
import "../styles/SignIn.css";

const SignInPage = ({ onLoginSuccess }) => {
    // const navigate = useNavigate();
    // const [showPassword, setShowPassword] = useState(false);
    // const [userId, setUserId] = useState("");
    // const [password, setPassword] = useState("");
    // const navigate = useNavigate(); // Hook for navigation

    // const handleSignIn = (e) => {
    //     e.preventDefault();

    //     // Simulating authentication (replace with real authentication logic)
    //     if (userId === "admin@example.com" && password === "password123") {
    //         navigate("/home"); // Redirect to HomePage on successful login
    //     } else {
    //         alert("Invalid credentials. Please try again.");
    //     }
    // };

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
        <div className="vDSignInWRapper">
            <div className="signInLogo">
                <img src={logo} alt="Logo" />
            </div>
            <div className="signInForm">
                <div className="signInFormInner">
                    <h2>Sign in to your account</h2>
                    {error && <p className="login-error">{error}</p>}
                    <form onSubmit={handleLogin}>
                        <div className="signInFormGroup">
                            <label>User ID <span className="required">*</span></label>
                            <input
                                type="text"
                                placeholder="john.doe@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="signInFormGroup">
                            <label>Password <span className="required">*</span></label>
                            <div className="passwordInner">
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
                        </div>
                        <div className="signInFormGroup">
                            <div className="rememberMe">
                                <input type="checkbox" id="rememberMe" />
                                <label htmlFor="rememberMe">Remember Me</label>
                            </div>
                        </div>
                        <div className="signInFormGroup">
                            <button type="submit" className="login-button" disabled={loading}>
                                Sign In{loading ? <span className="loading-spinner"></span> : <img src={signin} alt="Sign In" />}
                            </button>
                        </div>
                        <div className="forgotPasswordAction">
                            {/* <Link to="/forgot-password" className="forgotPassword">
                                Forgot the password?
                            </Link> */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;