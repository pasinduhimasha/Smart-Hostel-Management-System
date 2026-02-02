// src/pages/ManagePayments.jsx
import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import { FaTrash, FaEdit } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ManagePayments() {
  const [payments, setPayments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [statusEdit, setStatusEdit] = useState("");

  // Load payments real-time
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "payments"), (snap) => {
      const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPayments(data);
    });
    return () => unsub();
  }, []);

  const handleDelete = async (payment) => {
    if (!window.confirm("Are you sure you want to delete this payment?")) return;
    try {
      await deleteDoc(doc(db, "payments", payment.id));
    } catch (err) {
      console.error(err);
      alert("Error deleting payment");
    }
  };

  const handleEdit = (payment) => {
    setEditingId(payment.id);
    setStatusEdit(payment.status);
  };

  const handleSave = async (id) => {
    try {
      await updateDoc(doc(db, "payments", id), { status: statusEdit });
      setEditingId(null);
      setStatusEdit("");
    } catch (err) {
      console.error(err);
      alert("Error updating payment");
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05 } }),
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Payments</h1>

      <motion.div className="glass-card overflow-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2">Tenant</th>
              <th className="py-2">Room</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Status</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, i) => (
              <motion.tr
                key={payment.id}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-2">{payment.tenantName}</td>
                <td className="py-2">{payment.roomId}</td>
                <td className="py-2">Rs {payment.amount}</td>
                <td className="py-2">
                  {editingId === payment.id ? (
                    <select
                      value={statusEdit}
                      onChange={(e) => setStatusEdit(e.target.value)}
                      className="input-field"
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                    </select>
                  ) : (
                    <span className={payment.status === "paid" ? "text-green-500 font-semibold" : "text-red-500 font-semibold"}>
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                  )}
                </td>
                <td className="py-2 flex gap-2 flex-wrap">
                  {editingId === payment.id ? (
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                      onClick={() => handleSave(payment.id)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded"
                      onClick={() => handleEdit(payment)}
                    >
                      <FaEdit />
                    </button>
                  )}
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(payment)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
