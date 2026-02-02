import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa"; // Added logout icon
import "../styles/Sidebar.css";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    // Here you can clear tokens/session if any
    navigate("/"); // Redirect to Home
    setIsOpen(false); // Close sidebar
  };

  return (
    <>
      {/* Hamburger only on mobile */}
      <div className="mobile-header">
        <button className="hamburger-btn" onClick={toggleSidebar}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <h2 className="sidebar-title">Hostel Menu</h2>
        <nav>
          
          <NavLink to="/rooms" className="sidebar-link" onClick={() => setIsOpen(false)}>Rooms</NavLink>
          <NavLink to="/tenants" className="sidebar-link" onClick={() => setIsOpen(false)}>Tenants</NavLink>
          <NavLink to="/payments" className="sidebar-link" onClick={() => setIsOpen(false)}>Payments</NavLink>
          <NavLink to="/notices" className="sidebar-link" onClick={() => setIsOpen(false)}>Notices</NavLink>
          <NavLink to="/complaints" className="sidebar-link" onClick={() => setIsOpen(false)}>Complaints</NavLink>
        </nav>

        {/* Logout at the bottom */}
        <div className="sidebar-logout" onClick={handleLogout}>
          <FaSignOutAlt className="logout-icon" />
          <span>Logout</span>
        </div>
      </aside>

      {/* Overlay behind sidebar on mobile */}
      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
}
