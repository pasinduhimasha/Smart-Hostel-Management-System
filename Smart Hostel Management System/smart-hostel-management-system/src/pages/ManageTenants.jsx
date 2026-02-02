// src/pages/ManageTenants.jsx
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

export default function ManageTenants() {
  const [tenants, setTenants] = useState([]);
  const [allRooms, setAllRooms] = useState([]); // all rooms for table
  const [availableRooms, setAvailableRooms] = useState([]); // only available for dropdown
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", roomId: "" });
  const [editId, setEditId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Load tenants real-time
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "tenants"), (snap) => {
      const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTenants(data);
    });
    return () => unsub();
  }, []);

  // Load all rooms real-time
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "rooms"), (snap) => {
      const list = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAllRooms(list);

      // Filter rooms for dropdown: available or tenant's current room if editing
      const available = list.filter(
        (room) =>
          room.status.toLowerCase() === "available" ||
          (editId && tenants.find((t) => t.id === editId)?.roomId === room.roomId)
      );
      setAvailableRooms(available);
    });
    return () => unsub();
  }, [editId, tenants]);

  // Open modal
  const openAddModal = () => {
    setFormData({ name: "", roomId: "" });
    setEditId(null);
    setShowModal(true);
  };

  const openEditModal = (tenant) => {
    setFormData({ name: tenant.name, roomId: tenant.roomId });
    setEditId(tenant.id);
    setShowModal(true);
  };

  // Add/Edit tenant
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.roomId) return alert("Please fill all fields");
    setSubmitting(true);

    try {
      const selectedRoom = allRooms.find((r) => r.roomId === formData.roomId);
      const roomPrice = selectedRoom ? Number(selectedRoom.price) : 0;

      if (editId) {
        await updateDoc(doc(db, "tenants", editId), { ...formData, active: true });

        const oldTenant = tenants.find((t) => t.id === editId);
        if (oldTenant.roomId !== formData.roomId) {
          // Update old room to available
          const oldRoomRef = doc(db, "rooms", allRooms.find((r) => r.roomId === oldTenant.roomId)?.id);
          if (oldRoomRef) await updateDoc(oldRoomRef, { status: "Available" });

          // Update new room to occupied
          const newRoomRef = doc(db, "rooms", allRooms.find((r) => r.roomId === formData.roomId)?.id);
          if (newRoomRef) await updateDoc(newRoomRef, { status: "Occupied" });

          // Update payment for this tenant
          const q = query(collection(db, "payments"), where("tenantId", "==", editId));
          const paymentSnap = await getDocs(q);
          paymentSnap.forEach(async (docSnap) => {
            await updateDoc(doc(db, "payments", docSnap.id), { amount: roomPrice });
          });
        }
      } else {
        // Add new tenant
        const tenantRef = await addDoc(collection(db, "tenants"), { ...formData, active: true });

        // Update room status
        const roomRef = doc(db, "rooms", allRooms.find((r) => r.roomId === formData.roomId)?.id);
        if (roomRef) await updateDoc(roomRef, { status: "Occupied" });

        // Add payment record
        await addDoc(collection(db, "payments"), {
          tenantId: tenantRef.id,
          tenantName: formData.name,
          roomId: formData.roomId,
          amount: roomPrice,
          status: "pending",
          createdAt: new Date(),
        });
      }

      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Error saving tenant");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete tenant
  const handleDelete = async (tenant) => {
    if (!window.confirm("Are you sure you want to delete this tenant?")) return;

    try {
      await deleteDoc(doc(db, "tenants", tenant.id));

      // Set room back to available
      const roomRef = doc(db, "rooms", allRooms.find((r) => r.roomId === tenant.roomId)?.id);
      if (roomRef) await updateDoc(roomRef, { status: "Available" });

      // Delete payment
      const q = query(collection(db, "payments"), where("tenantId", "==", tenant.id));
      const paymentSnap = await getDocs(q);
      paymentSnap.forEach(async (docSnap) => {
        await deleteDoc(doc(db, "payments", docSnap.id));
      });
    } catch (err) {
      console.error(err);
      alert("Error deleting tenant");
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05 } }),
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold">Manage Tenants</h1>
        <button
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-md"
          onClick={openAddModal}
        >
          <FaPlus /> Add Tenant
        </button>
      </div>

      {/* Tenants Table */}
      <motion.div className="glass-card overflow-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2">Name</th>
              <th className="py-2">Room</th>
              <th className="py-2">Price</th>
              <th className="py-2">Active</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((tenant, i) => {
              const room = allRooms.find((r) => r.roomId === tenant.roomId);
              const price = room ? Number(room.price) : 0;

              return (
                <motion.tr
                  key={tenant.id}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-2">{tenant.name}</td>
                  <td className="py-2">{tenant.roomId}</td>
                  <td className="py-2">Rs {price}</td>
                  <td className={`py-2 font-semibold ${tenant.active ? "text-green-500" : "text-red-500"}`}>
                    {tenant.active ? "Yes" : "No"}
                  </td>
                  <td className="py-2 flex gap-2 flex-wrap">
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded" onClick={() => openEditModal(tenant)}>
                      <FaEdit />
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded" onClick={() => handleDelete(tenant)}>
                      <FaTrash />
                    </button>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </motion.div>

      {/* Add/Edit Modal */}
      {showModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div className="login-card p-6 bg-white rounded-lg w-full max-w-md shadow-lg">
      <h2 className="login-title text-xl font-bold mb-4">
        {editId ? "Edit Tenant" : "Add Tenant"}
      </h2>

      <div className="login-form flex flex-col gap-4">
        {/* Tenant Name */}
        <div className="input-group">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <label>Tenant Name</label>
        </div>

        {/* Room Selection */}
<div className="mb-4">
  <label className="block text-gray-700 font-medium mb-1">Room</label>
  <select
    value={formData.roomId}
    onChange={(e) => setFormData({ ...formData, roomId: e.target.value })}
    required
    className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="">Select Room</option>
    {availableRooms.map((room) => (
      <option key={room.id} value={room.roomId}>
        {room.roomId} - {room.type} (Rs {room.price})
      </option>
    ))}
  </select>
</div>



        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitting}
          className="login-btn"
        >
          {submitting ? "Saving..." : "Save"}
        </button>

        {/* Cancel Button */}
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
