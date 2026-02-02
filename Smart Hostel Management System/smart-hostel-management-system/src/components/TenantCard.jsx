// src/components/TenantCard.jsx
import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";

const TenantCard = ({ tenant, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.15, duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.05, y: -5 }}
      className="glass-card p-6 flex flex-col gap-3 relative overflow-hidden"
    >
   
      <span className="bubble bottom-right"></span>

      <div className="flex items-center gap-2 text-purple-500">
        <FaUser size={24} />
        <h2 className="text-xl font-semibold">{tenant.name}</h2>
      </div>

      <p className="text-gray-600">Room: {tenant.roomId}</p>

      <p
        className={`font-semibold ${
          tenant.active ? "text-green-500" : "text-red-500"
        }`}
      >
        Status: {tenant.active ? "Active" : "Inactive"}
      </p>
    </motion.div>
  );
};

export default TenantCard;
