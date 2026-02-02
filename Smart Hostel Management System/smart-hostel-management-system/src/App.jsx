import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";
import Tenants from "./pages/Tenants";
import Payments from "./pages/Payments";
import Notices from "./pages/Notices";
import Complaints from "./pages/Complaints";
import About from "./pages/About";       
import Services from "./pages/Services";
import Register from "./pages/Register";


import ManageTenants from "./pages/ManageTenants";
import ManageRooms from "./pages/ManageRooms";
import ManageInquiries from "./pages/ManageInquiries";
import ManagePayments from "./pages/ManagePayments";
import ManageNotices from "./pages/ManageNotices";
import AddAdmins from "./pages/AddAdmins";

import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import AdminLayout from "./layouts/AdminLayout"; // ✅ Must be default export

function App() {
  return (
    <Router>
      <Routes>
        {/* Public pages */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Dashboard pages */}
        <Route element={<DashboardLayout />}>
         
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/tenants" element={<Tenants />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/complaints" element={<Complaints />} />
        </Route>

        {/* Admin pages */}
        <Route element={<AdminLayout />}>
         <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manage-rooms" element={<ManageRooms />} />
          <Route path="/manage-tenants" element={<ManageTenants />} />
           <Route path="/manage-payments" element={<ManagePayments />} />
          <Route path="/manage-inquiries" element={<ManageInquiries />} />
          <Route path="/manage-notices" element={<ManageNotices />} />
          <Route path="/add-admins" element={<AddAdmins />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
