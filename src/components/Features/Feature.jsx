import { motion } from "framer-motion";
const Feature = ({ title, description, icon }) => {
  return (
    <motion.div
      className="feature"
      initial={{ x: 100, opacity: 0 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 3 }}
    >
      <div className="featuer__icon">{icon}</div>
      <h3 className="feature__title">{title}</h3>
      <p className="feature__description">{description}</p>
    </motion.div>
  );
};

export default Feature;
