import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import './home.css';

function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Loggedout");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="home-main-bg">
      <div className="home-card">
        <div className="home-header-row">
          <span className="home-welcome">Welcome {loggedInUser}</span>
          <button className="home-logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Home;
