// src/pages/Tenants.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import TenantCard from "../components/TenantCard";
import "../styles/Tenants.css";

const Tenants = () => {
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "tenants"), (snap) => {
      const tenantsData = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTenants(tenantsData);
    });

    return () => unsub();
  }, []);

  return (
    <motion.div
      className="tenants-page p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="page-title mb-6"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Tenants
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tenants.map((tenant, i) => (
          <TenantCard key={tenant.id} tenant={tenant} index={i} />
        ))}
      </div>
    </motion.div>
  );
};

export default Tenants;
