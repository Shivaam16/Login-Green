import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import './signup.css';

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const signupContainer = document.getElementById('signupContainer');
    setTimeout(() => {
      signupContainer.classList.add('show-signup');
    }, 200);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("name, email and password are required");
    }
    try {
      const url = `http://localhost:8080/auth/signup`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div id="signupContainer" className="signup-container">
      <div className="signup-content">
        {/* Left Section */}
        <div className="signup-welcome">
          <h1 className="welcome-text">Create Account</h1>
        </div>

        {/* Right Section */}
        <div className="signup-form-section">
          <div className="signup-form-wrapper">
            <form className="signup-form" onSubmit={handleSignup}>
              <div className="signup-input-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={signupInfo.name}
                  onChange={handleChange}
                  className="signup-input"
                  autoFocus
                />
              </div>
              <div className="signup-input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={signupInfo.email}
                  onChange={handleChange}
                  className="signup-input"
                />
              </div>
              <div className="signup-input-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={signupInfo.password}
                  onChange={handleChange}
                  className="signup-input"
                />
              </div>
              <button type="submit" className="signup-button">
                Sign Up
              </button>
              <div className="signup-links">
                <p className="login-prompt">
                  Already have an account?
                  <Link to="/login" className="login-link">Sign in here</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
