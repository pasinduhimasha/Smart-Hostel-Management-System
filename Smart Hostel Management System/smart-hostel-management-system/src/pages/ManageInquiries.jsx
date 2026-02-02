// src/pages/ManageInquiries.jsx
import { useEffect, useState } from "react";
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

export default function ManageInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [statusEdit, setStatusEdit] = useState("");

  // Load inquiries realtime
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "inquiries"), (snap) => {
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInquiries(data);
    });

    return () => unsub();
  }, []);

  const handleEdit = (inq) => {
    setEditingId(inq.id);
    setStatusEdit(inq.status);
  };

  const handleSave = async (id) => {
    try {
      await updateDoc(doc(db, "inquiries", id), {
        status: statusEdit,
      });
      setEditingId(null);
      setStatusEdit("");
    } catch (err) {
      console.error(err);
      alert("Error updating inquiry");
    }
  };

  const handleDelete = async (inq) => {
    if (!window.confirm("Delete this inquiry?")) return;
    try {
      await deleteDoc(doc(db, "inquiries", inq.id));
    } catch (err) {
      console.error(err);
      alert("Error deleting inquiry");
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "-";
    return new Date(timestamp.seconds * 1000).toLocaleString();
  };

  const rowAnim = {
    hidden: { opacity: 0, y: 15 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05 },
    }),
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Inquiries</h1>

      <motion.div
        className="glass-card overflow-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <table className="w-full text-left min-w-[800px]">
          <thead>
            <tr className="border-b">
              <th className="py-2">Tenant</th>
              <th className="py-2">Room</th>
              <th className="py-2">Message</th>
              <th className="py-2">Date</th>
              <th className="py-2">Status</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {inquiries.map((inq, i) => (
              <motion.tr
                key={inq.id}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={rowAnim}
                className="border-b hover:bg-gray-50"
              >
                <td className="py-2">{inq.tenantName}</td>
                <td className="py-2">{inq.roomId}</td>
                <td className="py-2 max-w-[300px]">{inq.message}</td>
                <td className="py-2">{formatDate(inq.createdAt)}</td>

                <td className="py-2">
                  {editingId === inq.id ? (
                    <select
                      value={statusEdit}
                      onChange={(e) => setStatusEdit(e.target.value)}
                      className="input-field"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  ) : (
                    <span
                      className={`font-semibold ${
                        inq.status === "Resolved"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {inq.status}
                    </span>
                  )}
                </td>

                <td className="py-2 flex gap-2">
                  {editingId === inq.id ? (
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded"
                      onClick={() => handleSave(inq.id)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="bg-yellow-400 text-white px-2 py-1 rounded"
                      onClick={() => handleEdit(inq)}
                    >
                      <FaEdit />
                    </button>
                  )}

                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(inq)}
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
