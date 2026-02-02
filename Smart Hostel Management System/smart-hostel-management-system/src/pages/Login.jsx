import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

import HomeNavbar from "../components/HomeNavbar";
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Popup states
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 🔹 Check if user is admin
      const adminDoc = await getDoc(doc(db, "admins", user.uid));
      if (adminDoc.exists()) {
        // ✅ Admin logged in → redirect to admin page
        navigate("/dashboard");
      } else {
        // ✅ Tenant logged in → redirect to tenant rooms
        navigate("/rooms");
      }

    } catch (error) {
      console.error(error);

      if (error.code === "auth/user-not-found") {
        setModalMessage("No account found with this email.");
      } else if (error.code === "auth/wrong-password") {
        setModalMessage("Incorrect password. Please try again.");
      } else if (error.code === "auth/invalid-email") {
        setModalMessage("Invalid email format.");
      } else {
        setModalMessage("Login failed. Please try again.");
      }

      setShowModal(true);
    }
  };

  return (
    <>
      <HomeNavbar />

      <div className="login-wrapper">
        <div className="login-card">
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-sub">Login to Smart Hostel</p>

          <form className="login-form" onSubmit={handleLogin}>
            <div className="input-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>Email</label>
            </div>

            <div className="input-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label>Password</label>
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

          <p className="login-footer">
            Don’t have an account?{" "}
            <span
              style={{ color: "#2563eb", cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </div>
      </div>

      {/* 🔴 ERROR POPUP */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Error</h3>
            <p>{modalMessage}</p>
            <button
              className="modal-btn"
              onClick={() => setShowModal(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
