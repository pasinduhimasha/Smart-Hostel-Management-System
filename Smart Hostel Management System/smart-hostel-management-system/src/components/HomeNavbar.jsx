import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/HomeNavbar.css";

const HomeNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="home-navbar">
      <div className="home-navbar-container">
        {/* Left - Brand */}
        <h1 className="home-logo">
          Smart Hostel Management System
        </h1>

        {/* Three-dot menu */}
        <div className="menu-dot" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Side menu */}
        <div className={`home-nav-links ${isOpen ? "open" : ""}`}>
          <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>About Us</NavLink>
          <NavLink to="/services" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Services</NavLink>
          <NavLink to="/login" className="login-btn">Login</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
