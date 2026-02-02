import { motion } from "framer-motion";
import HomeNavbar from "../components/HomeNavbar";
import "../styles/Services.css";
import Footer from "../components/Footer";

// Import images from src/assets
import roomsImg from "../assets/rooms.jpg";
import foodImg from "../assets/food.jpg";
import playImg from "../assets/play.jpg";
import systemImg from "../assets/system.jpg";

// Overview services using inline Tailwind SVGs
const overviewServices = [
  {
    title: "Room Management",
    icon: (
      <svg
        className="w-12 h-12 text-blue-500"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 10h18v11H3V10zM3 10l9-7 9 7"
        />
      </svg>
    ),
    desc: "Manage room availability, cleaning schedules, and maintenance easily.",
  },
  {
    title: "Tenant Profiles",
    icon: (
      <svg
        className="w-12 h-12 text-blue-500"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.121 17.804A12.056 12.056 0 0112 15c2.9 0 5.564 1 7.879 2.804M12 12a4 4 0 100-8 4 4 0 000 8z"
        />
      </svg>
    ),
    desc: "Secure digital tenant profiles with all information in one place.",
  },
  {
    title: "Payments",
    icon: (
      <svg
        className="w-12 h-12 text-blue-500"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8c-3 0-5 1.5-5 3s2 3 5 3 5-1.5 5-3-2-3-5-3z"
        />
      </svg>
    ),
    desc: "Track rent, dues, and payment history in real-time.",
  },
  {
    title: "Notice Board",
    icon: (
      <svg
        className="w-12 h-12 text-blue-500"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 20H5a2 2 0 01-2-2V7a2 2 0 012-2h4l2-2 2 2h4a2 2 0 012 2v11a2 2 0 01-2 2z"
        />
      </svg>
    ),
    desc: "Send alerts, announcements, and updates instantly to students.",
  },
];

// Detailed services
const detailedServices = [
  {
    title: "Modern Hostel Rooms",
    img: roomsImg,
    desc: "Spacious rooms with beds, study desks, lockers, and Wi-Fi. Comfortable and secure for students.",
    features: ["Comfortable beds", "Study areas", "High-speed Wi-Fi"],
  },
  {
    title: "Healthy & Hygienic Food",
    img: foodImg,
    desc: "Nutritious meals prepared hygienically with multiple menu options.",
    features: ["Balanced nutrition", "Daily preparation", "Menu variety"],
  },
  {
    title: "Play & Fitness Areas",
    img: playImg,
    desc: "Indoor and outdoor recreational spaces for relaxation and fitness.",
    features: ["Gym facilities", "Indoor games", "Open green spaces"],
  },
  {
    title: "Smart Hostel System",
    img: systemImg,
    desc: "Digital platform for room allocation, payments, notices, and complaints.",
    features: ["Room allocation", "Online payments", "Notice management"],
  },
];

const Services = () => {
  return (
    <div className="services-page bg-gray-50 min-h-screen">
      <HomeNavbar />

      {/* HERO */}
      <section className="services-hero text-center py-16">
        <motion.h1
          className="text-4xl font-bold text-blue-700 mb-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our Services
        </motion.h1>
        <motion.p
          className="text-gray-700 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Everything you need to manage a modern, secure, and student-friendly hostel.
        </motion.p>
      </section>

      {/* OVERVIEW SERVICES */}
      <section className="service-overview py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {overviewServices.map((service, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform duration-300 text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="mb-4 flex justify-center">{service.icon}</div>
              <h3 className="text-xl font-semibold text-blue-700 mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* DETAILED SERVICES */}
      <section className="detailed-services py-16 space-y-16 max-w-6xl mx-auto">
        {detailedServices.map((service, i) => (
          <motion.div
            key={i}
            className={`flex flex-col md:flex-row items-center ${
              i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } gap-8`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="md:w-1/2">
              <img
                src={service.img}
                alt={service.title}
                className="rounded-2xl shadow-lg w-full h-80 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="md:w-1/2 space-y-4">
              <h3 className="text-2xl font-bold text-blue-700">{service.title}</h3>
              <p className="text-gray-700">{service.desc}</p>
              <ul className="list-disc list-inside text-gray-600">
                {service.features.map((f, idx) => (
                  <li key={idx}>{f}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </section>

      <Footer/>

    </div>
  );
};

export default Services;
