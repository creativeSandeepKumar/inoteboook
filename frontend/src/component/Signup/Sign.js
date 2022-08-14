import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Sign = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://myinotebookapp.herokuapp.com/api/auth/createuser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      }
    );
    const json = await response.json();

    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/login");
      props.showAlert("Account created successfully", "success");
    } else {
      props.showAlert("Invalid credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <section className="signup-section">
      <h4>Create an Account to continue to use iNotebook</h4>
      <form onSubmit={handleSubmit} className="signup-form">
        <label htmlFor="name" className="signup-label">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={credentials.name}
          onChange={onChange}
          minLength={5}
          required
          className="signup-input"
        />
        <label htmlFor="email" className="signup-label">
          Email address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={credentials.email}
          onChange={onChange}
          minLength={5}
          required
          className="signup-input"
        />
        <label htmlFor="password" className="signup-label">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={credentials.password}
          onChange={onChange}
          minLength={5}
          required
          className="signup-input"
        />
        <label htmlFor="cpassword" className="signup-label">
          Confirm Password
        </label>
        <input
          type="password"
          value={credentials.cpassword}
          name="cpassword"
          id="cpassword"
          onChange={onChange}
          minLength={5}
          required
          className="signup-input"
        />
        <button type="submit" className="signup-btn">
          Submit
        </button>
      </form>
    </section>
  );
};

export default Sign;
