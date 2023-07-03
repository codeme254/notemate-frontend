import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import "./LandingHero.css";
const LandingHero = ({ mainTitle, descriptionText, image }) => {
  return (
    <section className="landing-hero" id="home">
      <div className="landing-hero__left">
        <motion.h2
          className="landing-hero__left--heading"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {mainTitle}
        </motion.h2>
        <motion.p
          className="landing-hero__left--text"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          {descriptionText}
        </motion.p>
        <Link to="/sign-up">
          <motion.a
            // href="/sign-up"
            className="landing-hero__left--link"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            whileTap={{ scale: 0.9 }}
          >
            Get started
          </motion.a>
        </Link>
      </div>

      <motion.img
        src={image}
        alt="note taking"
        className="landing-hero__image"
        // initial={{ x: 500 }}
        // animate={{ x: 0 }}
        // transition={{ duration: 1 }}
        animate={{ scale: [1, 1.01, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
      />
    </section>
  );
};

export default LandingHero;
