import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="bg-blue-100 text-blue-800 pt-12 pb-6 md:pt-16 md:pb-8 rounded-t-3xl shadow-inner"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-6">
        {/* About */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-4">About Smart Hostel</h3>
          <p className="text-blue-900 leading-relaxed">
            Secure, comfortable, and modern hostel living for students.
            Manage rooms, payments, notices, and recreational facilities seamlessly.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-blue-900">
            <li>
              <a href="/" className="hover:text-blue-600 transition-colors duration-300">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-blue-600 transition-colors duration-300">
                About
              </a>
            </li>
            <li>
              <a href="/services" className="hover:text-blue-600 transition-colors duration-300">
                Services
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-blue-600 transition-colors duration-300">
                Login
              </a>
            </li>
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-4">Contact </h3>
          <p className="text-blue-900">Email: info@smarthostel.com</p>
          <p className="text-blue-900">Phone: +94 71 123 4567</p>
          <p className="text-blue-900 mb-4">Colombo, Sri Lanka</p>
        </motion.div>
      </div>

      <hr className="my-6 border-blue-200 mx-6 md:mx-16" />

      {/* Animated Copyright */}
      <motion.p
        className="text-center text-blue-800 text-sm md:text-base"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
      >
        &copy; {new Date().getFullYear()} Smart Hostel Management System. All rights reserved.
      </motion.p>
    </motion.footer>
  );
};

export default Footer;
