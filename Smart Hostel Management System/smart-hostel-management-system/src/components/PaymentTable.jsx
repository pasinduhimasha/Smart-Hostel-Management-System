import { motion } from "framer-motion";

const PaymentTable = ({ payments }) => {
  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  return (
    <div className="glass-card p-6 overflow-auto">
      <h2 className="text-xl font-bold mb-4">Recent Payments</h2>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="py-2">Tenant</th>
            <th className="py-2">Room</th>
            <th className="py-2">Amount</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((payment, i) => (
            <motion.tr
              key={payment.id}
              custom={i}
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.02 }}
              className="border-b border-gray-100"
            >
              <td className="py-2">{payment.tenant}</td>
              <td className="py-2">{payment.room}</td>
              <td className="py-2">Rs {payment.amount}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;
