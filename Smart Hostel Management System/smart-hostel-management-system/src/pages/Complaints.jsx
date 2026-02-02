// src/pages/Complaints.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import "../styles/Complaints.css";

const Complaints = () => {
  const [tenants, setTenants] = useState([]);
  const [inquiries, setInquiries] = useState([]);

  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // 🔹 Load tenants for dropdown
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "tenants"), (snap) => {
      const list = snap.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        roomId: doc.data().roomId,
      }));
      setTenants(list);
    });

    return () => unsub();
  }, []);

  // 🔹 Load inquiries
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "inquiries"), (snap) => {
      const list = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setInquiries(list);
    });

    return () => unsub();
  }, []);

  // 🔹 Handle inquiry submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !roomId || !message) return alert("All fields are required");

    setSubmitting(true);
    try {
      await addDoc(collection(db, "inquiries"), {
        tenantName: name,
        roomId,
        message,
        status: "Pending",
        createdAt: serverTimestamp(),
      });

      alert("Inquiry submitted successfully!");
      setName("");
      setRoomId("");
      setMessage("");
    } catch (err) {
      console.error(err);
      alert("Error submitting inquiry");
    } finally {
      setSubmitting(false);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  return (
    <motion.div
      className="complaints-page p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="page-title mb-6"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Complaints & Inquiries
      </motion.h1>

      {/* Tenant Inquiries Table */}
      <motion.div
        className="glass-card mb-6 overflow-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FaEnvelope /> Tenant Inquiries
        </h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2">Tenant</th>
              <th className="py-2">Room</th>
              <th className="py-2">Message</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inq, i) => (
              <motion.tr
                key={inq.id}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                className="border-b border-gray-100"
              >
                <td className="py-2">{inq.tenantName}</td>
                <td className="py-2">{inq.roomId}</td>
                <td className="py-2">{inq.message}</td>
                <td
                  className={`py-2 font-semibold ${
                    inq.status === "Pending" ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {inq.status}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Inquiry / Feedback Form */}
      <motion.div
        className="glass-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FaEnvelope /> Submit Inquiry / Feedback
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
          <select
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="input-field"
          >
            <option value="">Select Room</option>
            {tenants.map((t) => (
              <option key={t.id} value={t.roomId}>
                {t.roomId} - {t.name}
              </option>
            ))}
          </select>
          <textarea
            placeholder="Write your inquiry or feedback..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="input-field resize-none h-24"
          />
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-md transition-all disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Complaints;
