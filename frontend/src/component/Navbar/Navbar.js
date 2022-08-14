import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./nav.css";

const Navbar = () => {
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  let location = useLocation();

  const handleOpenNav = () => {
    let navbarOpen = document.getElementById("navbar2Id");
    navbarOpen.classList.toggle("openNav");
  };
  return (
    <main className="navbar-main">
      <section className="navbar-section1">
        <aside className="navbar-aside1">
          <ul className="navbar-list">
            <li
              className={`navbar-listheading ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              <Link to="/">
                <h2>iNotebook</h2>{" "}
              </Link>
            </li>
            <li
              className={`navbar-listItem navbar-home ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              <Link to="/">Home</Link>
            </li>
            <li
              className={`navbar-listItem navbar-about ${
                location.pathname === "/about" ? "active" : ""
              }`}
            >
              <Link to="/about">About</Link>
            </li>
          </ul>
        </aside>
        <aside className="navbar-aside2" onClick={handleOpenNav}>
          <ul className="navbar-list">
            <li className="navbar-listItem">
              <i className="fa-solid fa-bars"></i>
            </li>
          </ul>
        </aside>
      </section>

      <section className="navbar-section2" id="navbar2Id">
        {!localStorage.getItem("token") ? (
          <ul className="navbar-list">
            <li className="navbar-listItem">
              <Link to="/login">LogIn</Link>
            </li>
            <li className="navbar-listItem">
              <Link to="/signup">SignUp</Link>
            </li>
          </ul>
        ) : (
          <button onClick={handleLogout} className="navbar-btn">
            Logout
          </button>
        )}
      </section>
    </main>
  );
};

export default Navbar;
