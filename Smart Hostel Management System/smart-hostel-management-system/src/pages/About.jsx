import { motion } from "framer-motion";
import HomeNavbar from "../components/HomeNavbar";
import "../styles/About.css";
import Footer from "../components/Footer";

// Images
import hostelImg from "../assets/hostel.jpg";
import roomsImg from "../assets/ourstory.jpg";
import foodImg from "../assets/mission.jpg";
import playImg from "../assets/vision.jpg";
import team1 from "../assets/team1.jpg";
import team2 from "../assets/team2.jpg";
import team3 from "../assets/team3.jpg";

const teamMembers = [
  { name: "Alice Johnson", role: "Hostel Manager", img: team1 },
  { name: "John Smith", role: "Warden", img: team2 },
  { name: "Sarah Lee", role: "Admin Officer", img: team3 },
];

const About = () => {
  return (
    <div className="about-page">
      <HomeNavbar />

      {/* HERO */}
      <section className="relative hero-section p-8 md:p-16 bg-gradient-to-r from-blue-100 via-blue-50 to-white rounded-b-3xl">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-blue-800"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          About Smart Hostel
        </motion.h1>
        <motion.p
          className="mt-4 text-lg md:text-xl text-gray-700 max-w-2xl"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Experience modern, secure, and well-managed hostel living with
          comfort, convenience, and technology-driven facilities.
        </motion.p>

        <motion.img
          src={hostelImg}
          alt="Hostel"
          className="mt-8 w-full md:w-3/4 rounded-2xl shadow-lg mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        />
      </section>

      {/* STORY / HISTORY */}
      <section className="story-section p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
        <motion.img
          src={roomsImg}
          alt="Hostel Rooms"
          className="w-full md:w-1/2 rounded-xl shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        />
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold text-blue-800 mb-4">Our Story</h2>
          <p className="text-gray-700 mb-4">
            Smart Hostel started with a mission to provide students with a secure,
            comfortable, and well-organized living space. With modern amenities,
            digital management, and a focus on health and security, we create a
            home away from home.
          </p>
          <p className="text-gray-700">
            Over the years, we have upgraded our facilities, implemented smart
            systems for payments and notices, and expanded our recreational areas
            to enhance student life.
          </p>
        </motion.div>
      </section>

      {/* MISSION & VISION */}
      <section className="mission-vision-section bg-blue-50 p-8 md:p-16">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <img src={foodImg} alt="Mission" className="w-40 h-40 rounded-full mb-4 object-cover" />
            <h3 className="text-2xl font-semibold text-blue-800 mb-2">Our Mission</h3>
            <p className="text-gray-700">
              To provide students with a safe, comfortable, and technology-driven
              hostel experience that supports both academic and personal growth.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <img src={playImg} alt="Vision" className="w-40 h-40 rounded-full mb-4 object-cover" />
            <h3 className="text-2xl font-semibold text-blue-800 mb-2">Our Vision</h3>
            <p className="text-gray-700">
              To become a leading smart hostel solution integrating innovation,
              automation, and student-friendly management systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="team-section p-8 md:p-16">
        <h2 className="text-3xl font-semibold text-blue-800 mb-8 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, i) => (
            <motion.div
              key={i}
              className="team-card bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <img src={member.img} alt={member.name} className="w-full h-64 object-cover" />
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-blue-800">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

          <Footer/>
     
    </div>
  );
};

export default About;
