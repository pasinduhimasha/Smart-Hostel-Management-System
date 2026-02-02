import { motion } from "framer-motion";

const NoticeBoard = ({ notices }) => {
  const noticeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  return (
    <div className="glass-card p-6">
      <h2 className="text-xl font-bold mb-4">Notices</h2>
      <ul className="space-y-3">
        {notices.map((notice, i) => (
          <motion.li
            key={i}
            custom={i}
            variants={noticeVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-white/30 rounded-lg backdrop-blur-sm shadow-sm cursor-pointer"
          >
            <p className="font-semibold">{notice.title}</p>
            <p className="text-gray-600 text-sm">{notice.date}</p>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default NoticeBoard;
