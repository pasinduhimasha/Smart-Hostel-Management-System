import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

import "../styles/Login.css";

const Register = () => {
  const navigate = useNavigate();

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    // 🔹 Reset modal state FIRST
    setShowModal(false);
    setIsSuccess(false);
    setModalMessage("");

    // 🔹 Simple validation BEFORE Firebase
    if (!fullName || !email || !password) {
      setModalMessage("All fields are required.");
      setShowModal(true);
      return;
    }

    if (password.length < 6) {
      setModalMessage("Password must be at least 6 characters.");
      setShowModal(true);
      return;
    }

    try {
      // 🔹 Create user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // 🔹 Save user data
      await setDoc(doc(db, "users", user.uid), {
        fullName,
        email,
        role: "tenant", // important for future admin logic
        createdAt: serverTimestamp(),
      });

      // ✅ Success
      setIsSuccess(true);
      setModalMessage("Registration successful! You can now log in.");
      setShowModal(true);

    } catch (error) {
      setIsSuccess(false);

      if (error.code === "auth/email-already-in-use") {
        setModalMessage("This email is already registered.");
      } else if (error.code === "auth/invalid-email") {
        setModalMessage("Invalid email address.");
      } else if (error.code === "auth/weak-password") {
        setModalMessage("Password is too weak.");
      } else {
        setModalMessage("Something went wrong. Please try again.");
      }

      setShowModal(true);
    }
  };

  const handleModalOk = () => {
    setShowModal(false);
    if (isSuccess) {
      navigate("/login");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">Create Account</h2>
        <p className="login-sub">Join Smart Hostel</p>

        <form className="login-form" onSubmit={handleRegister}>
          <div className="input-group">
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <label>Full Name</label>
          </div>

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
            Register
          </button>
        </form>

        <p className="login-footer">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ color: "#2563eb", cursor: "pointer" }}
          >
            Login
          </span>
        </p>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{isSuccess ? "Success" : "Error"}</h3>
            <p>{modalMessage}</p>
            <button className="modal-btn" onClick={handleModalOk}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
