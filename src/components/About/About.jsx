import TitleElement from "../TitleElement/TitleElement";
import "./About.css";
import organizingNotes from "../../assets/organize-notes.svg";
import { motion } from "framer-motion";
const About = () => {
  return (
    <section className="about" id="about">
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <TitleElement subTitle="about notemate" mainTitle="what is notemate" />
      </motion.span>
      <div className="about__container">
        <motion.img
          src={organizingNotes}
          alt="user organizing notes with notemate"
          className="about__image"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 2 }}
        />
        <motion.p
          className="about__description"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 2 }}
        >
          Our application is a powerful online platform designed for storing and
          sharing study notes. With a user-friendly interface, it allows
          individuals to seamlessly create and store their study materials.
          While not offering collaboration features, the platform enables users
          to access public study notes shared by others, promoting knowledge
          exchange and learning. Additionally, users can mark their favorite
          study notes for quick reference. With its focus on convenience and
          accessibility, our application serves as a go-to hub for students and
          learners, fostering a vibrant community of knowledge enthusiasts.
          Start organizing and sharing your study notes today!
        </motion.p>
      </div>
    </section>
  );
};

export default About;
