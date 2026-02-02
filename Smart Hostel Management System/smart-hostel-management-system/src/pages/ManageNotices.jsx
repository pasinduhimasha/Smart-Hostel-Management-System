import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ManageNotices() {
  const [notices, setNotices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
  });

  // 🔄 Load notices real-time
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "notices"), (snap) => {
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotices(data);
    });

    return () => unsub();
  }, []);

  // 🟢 Open add modal
  const openAddModal = () => {
    setFormData({ title: "", date: "" });
    setEditId(null);
    setShowModal(true);
  };

  // ✏️ Open edit modal
  const openEditModal = (notice) => {
    setFormData({
      title: notice.title,
      date: notice.date,
    });
    setEditId(notice.id);
    setShowModal(true);
  };

  // 💾 Add / Edit notice
  const handleSubmit = async () => {
    if (!formData.title || !formData.date) {
      return alert("Please fill all fields");
    }

    setSubmitting(true);

    try {
      if (editId) {
        await updateDoc(doc(db, "notices", editId), {
          ...formData,
        });
      } else {
        await addDoc(collection(db, "notices"), {
          ...formData,
          createdAt: serverTimestamp(),
        });
      }

      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Error saving notice");
    } finally {
      setSubmitting(false);
    }
  };

  // 🗑 Delete notice
  const handleDelete = async (noticeId) => {
    if (!window.confirm("Delete this notice?")) return;

    try {
      await deleteDoc(doc(db, "notices", noticeId));
    } catch (err) {
      console.error(err);
      alert("Error deleting notice");
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold">Manage Notices</h1>
        <button
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-md"
          onClick={openAddModal}
        >
          <FaPlus /> Add Notice
        </button>
      </div>

      {/* Notices Table */}
      <motion.div
        className="glass-card overflow-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2">Title</th>
              <th className="py-2">Date</th>
              <th className="py-2">Created At</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notices.map((notice, i) => (
              <motion.tr
                key={notice.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-2">{notice.title}</td>
                <td className="py-2">{notice.date}</td>
                <td className="py-2 text-sm text-gray-600">
                  {notice.createdAt?.toDate
                    ? notice.createdAt.toDate().toLocaleString()
                    : "—"}
                </td>
                <td className="py-2 flex gap-2">
                  <button
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded"
                    onClick={() => openEditModal(notice)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(notice.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="login-card p-6 bg-white rounded-lg w-full max-w-md shadow-lg">
            <h2 className="login-title text-xl font-bold mb-4">
              {editId ? "Edit Notice" : "Add Notice"}
            </h2>

            <div className="login-form flex flex-col gap-4">
              {/* Title */}
              <div className="input-group">
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
                <label>Notice Title</label>
              </div>

              {/* Date */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              {/* Save */}
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="login-btn"
              >
                {submitting ? "Saving..." : "Save"}
              </button>

              {/* Cancel */}
              <button
                onClick={() => setShowModal(false)}
                className="login-btn bg-gray-300 text-gray-700 hover:bg-gray-400"
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
