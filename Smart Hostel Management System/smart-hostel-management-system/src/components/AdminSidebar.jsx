// src/components/AdminSidebar.jsx
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import "../styles/Sidebar.css";

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const handleLogout = () => navigate("/");

  return (
    <>
      {/* Mobile hamburger */}
      <div className="mobile-header">
        <button className="hamburger-btn" onClick={toggleSidebar}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <h2 className="sidebar-title">Admin Panel</h2>
        <nav>
          <NavLink to="/dashboard" className="sidebar-link" onClick={() => setIsOpen(false)}>Dashboard</NavLink>
          <NavLink to="/manage-rooms" className="sidebar-link" onClick={() => setIsOpen(false)}>Manage Rooms</NavLink>
          <NavLink to="/manage-tenants" className="sidebar-link" onClick={() => setIsOpen(false)}>Manage Tenants</NavLink>
           <NavLink to="/manage-payments" className="sidebar-link" onClick={() => setIsOpen(false)}>Manage payments</NavLink>
            <NavLink to="/manage-notices" className="sidebar-link" onClick={() => setIsOpen(false)}>Manage Notices</NavLink>
          <NavLink to="/manage-inquiries" className="sidebar-link" onClick={() => setIsOpen(false)}>Manage Inquiries</NavLink>
          <NavLink to="/add-admins" className="sidebar-link" onClick={() => setIsOpen(false)}>Add Admins</NavLink>
        </nav>

        <div className="sidebar-logout" onClick={handleLogout}>
          <FaSignOutAlt className="logout-icon" />
          <span>Logout</span>
        </div>
      </aside>

      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
}
