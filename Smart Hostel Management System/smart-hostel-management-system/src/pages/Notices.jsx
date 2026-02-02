// src/pages/Notices.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import NoticeBoard from "../components/NoticeBoard";
import "../styles/Notices.css";

const Notices = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    // 🔹 Create query (order by createdAt descending)
    const q = query(collection(db, "notices"), orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotices(list);
    });

    return () => unsub(); // Cleanup on unmount
  }, []);

  return (
    <motion.div
      className="notices-page p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="page-title mb-6"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Notices
      </motion.h1>

      <NoticeBoard notices={notices} />
    </motion.div>
  );
};

export default Notices;
