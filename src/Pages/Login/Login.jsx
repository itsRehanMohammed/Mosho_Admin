import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import "./Login.css";

const Login = ({ setActivePage }) => {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  const onChangeHandler = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const userData = async () => {
    const response = await fetch("https://mosho.onrender.com/api/me", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await response.json();
    localStorage.setItem("username", data.name);
    localStorage.setItem("role", data.role);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("https://mosho.onrender.com/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });
    const data = await response.json();

    if (data.success) {
      toast.success("Logged in successfully!");
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      userData();
      //
      setActivePage("home");

      setTimeout(() => window.location.reload(), 2000);
    } else {
      toast.error(data.message);
    }
  };
  return (
    <div className="Login">
      <div className="login-form-wrapper">
        <div className="login-head">
          <span className="lock-icon">
            {" "}
            <LockOutlinedIcon />
          </span>
          <h2>Login in</h2>
        </div>
        <form action="" onSubmit={handleSubmit} className="form">
          <div className="login-email">
            <TextField required autoComplete="true" onChange={onChangeHandler} value={credentials.email} className="input-email" id="input-email" label="Email" name="email" type="email" />
          </div>
          <div className="login-password">
            <TextField required autoComplete="true" onChange={onChangeHandler} value={credentials.password} type="password" className="input-password" id="input-password" label="Password" name="password" />
          </div>
          <div className="login-button">
            <button type="submit" className="input-button">
              {/* {spinner ? <TailSpin height={25} color="#fff" wrapperStyle={{ justifyContent: "center" }} /> : "LOGIN IN"} */}
              LOGIN{" "}
            </button>
          </div>
        </form>

        <div className="login-copyright">
          <p>Copyright © Mosho {new Date().getFullYear()} </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
