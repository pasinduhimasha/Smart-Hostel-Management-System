import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaBed } from "react-icons/fa";
import { doc, onSnapshot, collection, addDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const RoomCard = ({ room, index }) => {
  const [roomData, setRoomData] = useState(room);
  const [showPayModal, setShowPayModal] = useState(false);
  const [tenantName, setTenantName] = useState("");
  const [duration, setDuration] = useState(1);
  const [paying, setPaying] = useState(false);

  // Listen to real-time room updates
  useEffect(() => {
    const roomRef = doc(db, "rooms", room.id);
    const unsub = onSnapshot(roomRef, (docSnap) => {
      if (docSnap.exists()) setRoomData({ id: docSnap.id, ...docSnap.data() });
    });
    return () => unsub();
  }, [room.id]);

  if (!roomData) return null;

  const isAvailable = roomData.status?.toLowerCase() === "available";
  const totalAmount = Number(roomData.price ?? 0) * duration;

  const handlePay = async () => {
    if (!tenantName.trim()) return alert("Please enter tenant name.");
    setPaying(true);
    try {
      // Add tenant
      const tenantRef = await addDoc(collection(db, "tenants"), {
        name: tenantName,
        roomId: roomData.roomId,
        active: true,
        createdAt: serverTimestamp(),
      });

      // Add payment
      await addDoc(collection(db, "payments"), {
        tenantId: tenantRef.id,
        tenantName,
        roomId: roomData.roomId,
        roomType: roomData.type,
        amount: totalAmount,
        duration,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      // Update room status to occupied
      await updateDoc(doc(db, "rooms", roomData.id), { status: "occupied" });

      alert("Payment successful!");
      setShowPayModal(false);
      setTenantName("");
      setDuration(1);
    } catch (err) {
      console.error(err);
      alert("Payment error");
    } finally {
      setPaying(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ scale: 1.05, y: -5 }}
        className="glass-card p-6 flex flex-col gap-3 relative overflow-hidden"
      >
        <span className="bubble bottom-right"></span>

        <div className="flex items-center gap-2 text-blue-500">
          <FaBed size={24} />
          <h2 className="text-xl font-semibold">Room {roomData.roomId}</h2>
        </div>
        <p>Type: {roomData.type}</p>
        <p>Price: Rs {roomData.price}</p>
        <p className={`font-semibold ${isAvailable ? "text-green-500" : "text-red-500"}`}>
          Status: {roomData.status.charAt(0).toUpperCase() + roomData.status.slice(1)}
        </p>

        {isAvailable && (
          <button
            onClick={() => setShowPayModal(true)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-500/80 backdrop-blur-md hover:bg-blue-600/90 text-white py-2 px-4 rounded-full shadow-lg transition-all duration-300"
          >
            Pay now
          </button>
        )}
      </motion.div>

      {/* Popup Modal with your beautiful CSS */}
      {showPayModal && (
        <div className="modal-overlay">
          <div className="login-card">
            <h2 className="login-title">Pay for Room {roomData.roomId}</h2>
            <p className="login-sub">
              Type: {roomData.type} | Price per day: Rs {roomData.price}
            </p>

            <div className="login-form">
              <div className="input-group">
                <input
                  type="text"
                  value={tenantName}
                  onChange={(e) => setTenantName(e.target.value)}
                  required
                />
                <label>Tenant Name</label>
              </div>

              <div className="input-group">
                <input
                  type="number"
                  min={1}
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  required
                />
                <label>Duration (days)</label>
              </div>

              <p className="login-sub font-semibold">Total Amount: Rs {totalAmount}</p>

              <button onClick={handlePay} disabled={paying} className="login-btn">
                {paying ? "Processing..." : "Pay Now"}
              </button>
              <button
                onClick={() => setShowPayModal(false)}
                className="login-btn mt-2 bg-gray-300 text-gray-700 hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RoomCard;
