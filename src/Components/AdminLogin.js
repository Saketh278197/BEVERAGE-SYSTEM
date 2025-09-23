import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailed } from "../utils/ReduxStore/AuthSlice";
import "../style/Admin_login.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Admin_userName, setAdmin_UserName] = useState("");
  const [Admin_Password, setAdmin_Password] = useState("");

  const submit = (e) => {
    e.preventDefault();

    if (Admin_userName === "admin123" && Admin_Password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      dispatch(loginSuccess());
      navigate("/queue");
    } else {
      dispatch(loginFailed());
      alert("Please enter valid credentials");
    }
  };

  return (
    <div className="admin-container">
      <div className="Admin">
        <img
          className="AdminLogo"
          src="https://i.ibb.co/JRWVXCDk/Adobe-Express-file.png"
        ></img>
      </div>
      <label>Admin UserName</label>
      <input
        type="text"
        data-testid="username-input"
        value={Admin_userName}
        onChange={(e) => setAdmin_UserName(e.target.value)}
      />
      <br />
      <label>Password</label>
      <input
        type="password"
        data-testid="password-input"
        value={Admin_Password}
        onChange={(e) => setAdmin_Password(e.target.value)}
      />
      <br />
      <button onClick={submit} type="submit">
        Login
      </button>
    </div>
  );
};

export default AdminLogin;
