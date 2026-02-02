// src/pages/ManageAdmins.jsx
import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../firebase";
import { FaTrash, FaPlus, FaEdit } from "react-icons/fa";

export default function ManageAdmins() {
  const [admins, setAdmins] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  // Load admins real-time
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "admins"), (snap) => {
      setAdmins(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  // Open Add modal
  const openAddModal = () => {
    setFullName("");
    setEmail("");
    setPassword("");
    setEditId(null);
    setShowModal(true);
  };

  // Open Edit modal
  const openEditModal = (admin) => {
    setFullName(admin.fullName || "");
    setEditId(admin.id);
    setShowModal(true);
  };

  // Add or Edit admin
  const handleSubmit = async () => {
    if (!fullName || (!editId && (!email || !password))) {
      return alert("All fields are required");
    }

    setLoading(true);
    try {
      if (editId) {
        // Edit admin - only full name is updated
        await setDoc(
          doc(db, "admins", editId),
          {
            fullName,
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );
        alert("Admin updated successfully");
      } else {
        // Add new admin
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        const uid = cred.user.uid;
        await setDoc(doc(db, "admins", uid), {
          fullName,
          email,
          role: "admin",
          createdAt: serverTimestamp(),
        });
        alert("Admin added successfully");
      }

      setFullName("");
      setEmail("");
      setPassword("");
      setEditId(null);
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete admin
  const handleDelete = async (admin) => {
    if (!window.confirm(`Delete admin ${admin.fullName}?`)) return;
    try {
      await deleteDoc(doc(db, "admins", admin.id));
      alert("Admin deleted");
    } catch (err) {
      console.error(err);
      alert("Error deleting admin");
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Admins</h1>
        <button
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={openAddModal}
        >
          <FaPlus /> Add Admin
        </button>
      </div>

      {/* Admin Table */}
      <div className="glass-card overflow-auto p-4">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2">Full Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Role</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-2">{admin.fullName || ""}</td>
                <td className="py-2">{admin.email}</td>
                <td className="py-2 font-semibold">{admin.role}</td>
                <td className="py-2 flex gap-2">
                  {/* Edit Button */}
                  <button
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded"
                    onClick={() => openEditModal(admin)}
                  >
                    <FaEdit />
                  </button>

                  {/* Delete Button */}
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(admin)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="login-card p-6 bg-white rounded-lg w-full max-w-md shadow-lg">
            <h2 className="login-title text-xl font-bold mb-4">
              {editId ? "Edit Admin" : "Add New Admin"}
            </h2>

            <div className="login-form">
              {/* Full Name */}
              <div className="input-group">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
                <label>Full Name</label>
              </div>

              {/* Email - only when adding */}
              {!editId && (
                <div className="input-group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label>Email</label>
                </div>
              )}

              {/* Password - only when adding */}
              {!editId && (
                <div className="input-group">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label>Temporary Password</label>
                </div>
              )}

              {/* Buttons */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="login-btn"
              >
                {loading ? (editId ? "Updating..." : "Creating...") : (editId ? "Update Admin" : "Add Admin")}
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="login-btn mt-2 bg-gray-300 text-gray-700 hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
