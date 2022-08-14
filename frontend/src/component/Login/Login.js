import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://myinotebookapp.herokuapp.com/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      props.showAlert("Logged in successfully", "success");
      navigate("/");
    } else {
      props.showAlert("Invalid details", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <section className="login-section">
      <h4>Login to continue to inotebook</h4>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email" className="login-label">
          Email address
        </label>
        <input
          className="login-input"
          type="email"
          name="email"
          id="email"
          value={credentials.email}
          onChange={onChange}
          required
        />
        <label htmlFor="password" className="login-label">
          Password
        </label>
        <input
          className="login-input"
          type="password"
          name="password"
          id="password"
          value={credentials.password}
          onChange={onChange}
          required
        />
        <button type="submit" className="login-btn">
          Submit
        </button>
      </form>
    </section>
  );
};

export default Login;
