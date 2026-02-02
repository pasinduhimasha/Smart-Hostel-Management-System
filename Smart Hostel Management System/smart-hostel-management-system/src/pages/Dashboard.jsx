// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaBed, FaUser, FaMoneyBill } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [totalRooms, setTotalRooms] = useState(0);
  const [tenantsCount, setTenantsCount] = useState(0);
  const [pendingPayments, setPendingPayments] = useState(0);
  const [paymentsData, setPaymentsData] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  useEffect(() => {
    // 🔹 Total Rooms
    const unsubRooms = onSnapshot(collection(db, "rooms"), (snap) => {
      setTotalRooms(snap.size);
    });

    // 🔹 Tenants + Recent Tenant Check-ins
    const unsubTenants = onSnapshot(collection(db, "tenants"), (snap) => {
      setTenantsCount(snap.size);

      const tenantActivities = snap.docs.map((doc) => {
        const data = doc.data();
        return {
          id: `tenant-${doc.id}`,
          text: `Tenant ${data.name} checked in.`,
          time: data.createdAt?.toDate() || new Date(),
        };
      });

      // Merge tenant activities while keeping existing payment activities
      setRecentActivities((prev) => {
        const paymentActivities = prev.filter((a) => !a.id.startsWith("tenant-"));
        const combined = [...tenantActivities, ...paymentActivities];
        combined.sort((a, b) => b.time - a.time); // newest first
        return combined.slice(0, 5);
      });
    });

    // 🔹 Payments + Pending Payments + Activity Feed
    const unsubPayments = onSnapshot(collection(db, "payments"), (snap) => {
      let pending = 0;
      const paymentActivities = [];

      snap.docs.forEach((doc) => {
        const data = doc.data();
        const status = (data.status || "").toLowerCase();

        if (status === "pending") pending += 1;
        if (status === "paid") {
          paymentActivities.push({
            id: `payment-${doc.id}`,
            text: `Payment of Rs ${data.amount || 0} received from ${data.tenantName || "Unknown"}`,
            time: data.createdAt?.toDate() || new Date(),
          });
        }
      });

      setPendingPayments(pending);

      setRecentActivities((prev) => mergeActivities(prev, paymentActivities));
    });

    // 🔹 Monthly Payments Chart
    const unsubPaymentsChart = onSnapshot(collection(db, "payments"), (snap) => {
      const monthlyTotals = {};

      snap.docs.forEach((doc) => {
        const data = doc.data();
        if (!data.createdAt) return;

        const date = data.createdAt.toDate();
        const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`; // e.g., "2026-1"
        monthlyTotals[monthKey] = (monthlyTotals[monthKey] || 0) + Number(data.amount || 0);
      });

      const chartData = Object.keys(monthlyTotals)
        .sort()
        .map((key) => {
          const [year, month] = key.split("-");
          const monthName = new Date(year, month - 1).toLocaleString("default", { month: "short" });
          return {
            month: monthName,
            payments: monthlyTotals[key],
          };
        });

      setPaymentsData(chartData.length ? chartData : [{ month: "Jan", payments: 0 }]);
    });

    return () => {
      unsubRooms();
      unsubTenants();
      unsubPayments();
      unsubPaymentsChart();
    };
  }, []);

  // Helper to merge activities
  const mergeActivities = (oldActivities, newActivities) => {
    const combined = [...oldActivities, ...newActivities];
    combined.sort((a, b) => b.time - a.time);
    return combined.slice(0, 5);
  };

  const cardData = [
    { title: "Total Rooms", value: totalRooms, icon: <FaBed size={28} className="text-blue-500" /> },
    { title: "Tenants", value: tenantsCount, icon: <FaUser size={28} className="text-purple-500" /> },
    { title: "Pending Payments", value: pendingPayments, icon: <FaMoneyBill size={28} className="text-green-500" /> },
  ];

  return (
    <motion.div
      className="dashboard-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div
        className="dashboard-header mb-6"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="dashboard-title">Smart Hostel Dashboard</h1>
        <p className="dashboard-subtitle">Live data from Firestore</p>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cardData.map((item, i) => (
          <motion.div
            key={item.title}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            className="glass-card flex flex-col items-start gap-3 relative overflow-hidden"
          >
            <span className="bubble bottom-right"></span>
            <div className="flex items-center gap-2">
              {item.icon}
              <p className="card-label">{item.title}</p>
            </div>
            <p className="card-value">{item.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts + Activity Feed */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monthly Payments Chart */}
        <motion.div
          className="glass-card p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold mb-4">Monthly Payments (Rs)</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart
              data={paymentsData.length ? paymentsData : [{ month: "Jan", payments: 0 }]}
            >
              <CartesianGrid stroke="#f0f0f0" strokeDasharray="5 5" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="payments"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent Activity Feed */}
        <motion.div
          className="glass-card p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <ul className="text-gray-700 space-y-3">
            {recentActivities.map((activity) => (
              <li
                key={activity.id}
                className="flex justify-between items-center"
              >
                <span>{activity.text}</span>
                <span className="text-sm text-gray-400">
                  {activity.time instanceof Date
                    ? activity.time.toLocaleString()
                    : activity.time}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
