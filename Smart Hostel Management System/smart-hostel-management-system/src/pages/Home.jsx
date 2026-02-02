import { motion } from "framer-motion";
import HomeNavbar from "../components/HomeNavbar";
import "../styles/Home.css";
import Footer from "../components/Footer";


// Images for features
import heroImage from "../assets/hero-hostel.png";
import roomFeature from "../assets/room-feature.jpg";
import tenantFeature from "../assets/tenant-feature.jpg";
import paymentFeature from "../assets/payment-feature.jpg";
import noticeFeature from "../assets/notice-feature.jpg";

const features = [
  { img: roomFeature, title: "Room Management", desc: "Track availability, occupancy, and maintenance efficiently." },
  { img: tenantFeature, title: "Tenant Profiles", desc: "Secure digital tenant profiles all in one place." },
  { img: paymentFeature, title: "Payments", desc: "Track all payments and dues in real-time." },
  { img: noticeFeature, title: "Notice Board", desc: "Send alerts, updates, and announcements instantly." },
];

const whyChoose = [
  { title: "Efficient Management", desc: "All hostel operations streamlined in one modern platform." },
  { title: "Secure & Safe", desc: "24/7 monitoring and verified tenant profiles ensure safety." },
  { title: "Student-Friendly", desc: "Comfortable rooms, meals, and recreational areas for students." },
];

const Home = () => {
  return (
    <div className="home-page">
      <HomeNavbar />

      {/* HERO SECTION */}
      <section className="hero-section relative">
        <span className="bubble top-left"></span>
        <span className="bubble bottom-right"></span>

        <motion.div
          className="hero-content"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-blue-800">
            Smart Hostel Management System
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-2xl">
            Manage rooms, tenants, payments, and notices efficiently with a modern interface.
          </p>
          <div className="hero-buttons mt-6 flex flex-wrap gap-4">
            <a href="/login" className="primary-btn">Get Started</a>
            <a href="/about" className="secondary-btn">Learn More</a>
          </div>
        </motion.div>

        <motion.div
          className="hero-image mt-8"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={heroImage}
            alt="Hostel Management"
            className="rounded-2xl shadow-xl w-full md:w-3/4 mx-auto"
          />
        </motion.div>
      </section>

      {/* FEATURES IMAGE SECTION */}
      <section className="features-image-section py-16 px-6 md:px-16 bg-blue-50">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Explore Our Hostel Features
        </motion.h2>

        <div className="features-grid mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <img src={feature.img} alt={feature.title} className="feature-img"/>
              <div className="feature-content mt-4 text-center">
                <h3 className="text-xl font-semibold text-blue-800">{feature.title}</h3>
                <p className="text-gray-700">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ABOUT HOME SECTION */}
      <section className="about-home-section py-16 px-6 md:px-16">
        <motion.div
          className="about-home-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>About Smart Hostel</h2>
          <p>
            Smart Hostel Management System provides students with secure, comfortable, and well-managed hostel living.
            With modern rooms, automated payments, notice management, and recreational facilities, we make student life easier.
          </p>
          <p>
            Our goal is to integrate technology and convenience so that both hostel owners and students have a seamless experience,
            from room allocation to payments and communication.
          </p>
        </motion.div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="why-choose-section py-16 px-6 md:px-16 bg-blue-50">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Why Choose Smart Hostel
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {whyChoose.map((item, i) => (
            <motion.div
              key={i}
              className="feature-card p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold text-blue-800 mb-2">{item.title}</h3>
              <p className="text-gray-700">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

    <Footer />
    </div>
  );
};

export default Home;
