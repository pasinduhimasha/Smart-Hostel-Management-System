// src/pages/ManageRooms.jsx
import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ManageRooms() {
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    roomId: "",
    type: "",
    price: "",
    status: "Available",
  });
  const [editId, setEditId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Real-time load rooms
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "rooms"), (snapshot) => {
      const list = snapshot.docs.map((doc) => {
        const data = doc.data();
        const status = data.status
          ? data.status.charAt(0).toUpperCase() + data.status.slice(1).toLowerCase()
          : "Available";
        return { id: doc.id, ...data, status };
      });
      setRooms(list);
    });
    return () => unsub();
  }, []);

  // Open modal to add room
  const openAddModal = () => {
    setFormData({ roomId: "", type: "", price: "", status: "Available" });
    setEditId(null);
    setShowModal(true);
  };

  // Open modal to edit room
  const openEditModal = (room) => {
    setFormData({ ...room });
    setEditId(room.id);
    setShowModal(true);
  };

  // Add/Edit room
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.roomId || !formData.type || !formData.price) return;
    setSubmitting(true);

    try {
      if (editId) {
        const roomRef = doc(db, "rooms", editId);

        // If changing status to Available, delete only active tenant/payment/inquiry
        if (formData.status.toLowerCase() === "available") {
          await deleteActiveTenantData(formData.roomId);
        }

        await updateDoc(roomRef, {
          roomId: formData.roomId,
          type: formData.type,
          price: Number(formData.price),
          status: formData.status,
        });
      } else {
        await addDoc(collection(db, "rooms"), {
          roomId: formData.roomId,
          type: formData.type,
          price: Number(formData.price),
          status: formData.status,
        });
      }

      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Error saving room");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete room + all associated active data
  const handleDelete = async (id, roomId) => {
    if (!window.confirm("Are you sure? This will remove all related tenants, payments, and inquiries.")) return;

    try {
      await deleteActiveTenantData(roomId);
      await deleteDoc(doc(db, "rooms", id));
    } catch (err) {
      console.error(err);
      alert("Error deleting room");
    }
  };

  // Helper: Delete ONLY active tenants/payments/inquiries for a room
  const deleteActiveTenantData = async (roomId) => {
    const collections = ["tenants", "payments", "inquiries"];

    for (let col of collections) {
      const q = query(
        collection(db, col),
        where("roomId", "==", roomId),
        where("active", "==", true) // only active tenant records
      );
      const snap = await getDocs(q);
      for (let docSnap of snap.docs) {
        await deleteDoc(doc(db, col, docSnap.id));
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05 } }),
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold">Manage Rooms</h1>
        <button
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-md"
          onClick={openAddModal}
        >
          <FaPlus /> Add Room
        </button>
      </div>

      {/* Rooms Table */}
      <motion.div
        className="glass-card overflow-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2">Room ID</th>
              <th className="py-2">Type</th>
              <th className="py-2">Price</th>
              <th className="py-2">Status</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, i) => (
              <motion.tr
                key={room.id}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-2">{room.roomId}</td>
                <td className="py-2">{room.type}</td>
                <td className="py-2">{room.price}</td>
                <td
                  className={`py-2 font-semibold ${
                    room.status.toLowerCase() === "occupied" ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {room.status}
                </td>
                <td className="py-2 flex gap-2 flex-wrap">
                  <button
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded"
                    onClick={() => openEditModal(room)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(room.id, room.roomId)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Add/Edit Modal */}
{/* Popup Modal for Add/Edit Room */}
{showModal && (
  <div className="modal-overlay">
    <div className="login-card">
      <h2 className="login-title">{editId ? "Edit Room" : "Add Room"}</h2>

      <div className="login-form">
        <div className="input-group">
          <input
            type="text"
            value={formData.roomId}
            onChange={(e) => setFormData({ ...formData, roomId: e.target.value })}
            required
          />
          <label>Room ID</label>
        </div>

        <div className="input-group">
          <input
            type="text"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            required
          />
          <label>Type</label>
        </div>

        <div className="input-group">
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            required
          />
          <label>Price</label>
        </div>

    <div className="input-group">
  <label>Status</label>
  <select
    value={formData.status}
    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
    required
    className="input-field"
  >
    <option value="Available">Available</option>
    <option value="Occupied">Occupied</option>
    <option value="Maintenance">Maintenance</option>
  </select>
</div>

        <button onClick={handleSubmit} className="login-btn" disabled={submitting}>
          {submitting ? "Saving..." : "Save Room"}
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
