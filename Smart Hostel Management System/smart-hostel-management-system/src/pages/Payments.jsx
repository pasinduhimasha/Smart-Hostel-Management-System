// src/pages/Payments.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import PaymentTable from "../components/PaymentTable";
import "../styles/Payments.css";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [tenantsMap, setTenantsMap] = useState({});
  const [roomsMap, setRoomsMap] = useState({});

  // 🔹 Load tenants
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "tenants"), (snap) => {
      const map = {};
      snap.forEach((doc) => {
        map[doc.id] = doc.data().name;
      });
      setTenantsMap(map);
    });

    return () => unsub();
  }, []);

  // 🔹 Load rooms
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "rooms"), (snap) => {
      const map = {};
      snap.forEach((doc) => {
        map[doc.data().roomId] = doc.data().roomId;
      });
      setRoomsMap(map);
    });

    return () => unsub();
  }, []);

  // 🔹 Load payments AFTER tenants + rooms are ready
  useEffect(() => {
    if (!Object.keys(tenantsMap).length || !Object.keys(roomsMap).length) return;

    const unsub = onSnapshot(collection(db, "payments"), (snap) => {
      const list = snap.docs
        .map((doc) => {
          const data = doc.data();
          const tenantName = tenantsMap[data.tenantId];
          const roomId = roomsMap[data.roomId] || data.roomId;

          // Skip if tenant or room no longer exists
          if (!tenantName || !roomId) return null;

          return {
            id: doc.id,
            tenant: tenantName,
            room: roomId,
            amount: data.amount,
          };
        })
        .filter((item) => item !== null);

      setPayments(list);
    });

    return () => unsub();
  }, [tenantsMap, roomsMap]);

  return (
    <motion.div
      className="payments-page p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="page-title mb-6"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Payments
      </motion.h1>

      <PaymentTable payments={payments} />
    </motion.div>
  );
};

export default Payments;
