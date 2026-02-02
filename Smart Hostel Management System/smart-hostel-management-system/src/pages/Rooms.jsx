import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import RoomCard from "../components/RoomCard";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "rooms"), (snap) => {
      const roomsData = snap.docs
        .map((doc, index) => {
          const data = doc.data();
          if (!data) return null; // skip empty docs
          return {
            id: doc.id,
            roomId: data.roomId ?? doc.id, // fallback to doc.id
            type: data.type ?? "Single",
            status: data.status ?? "available",
            price: data.price ?? 0,
          };
        })
        .filter(Boolean); // remove nulls

      setRooms(roomsData);
    });

    return () => unsub();
  }, []);

  return (
    <motion.div
      className="rooms-page p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="page-title mb-6"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Rooms
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rooms.map((room, i) => (
          <RoomCard key={room.id} room={room} index={i} />
        ))}
      </div>
    </motion.div>
  );
};

export default Rooms;
