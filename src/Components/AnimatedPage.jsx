import { motion } from "framer-motion";

const animations = {
  initial: { opacity: 0, x: 100, scale: 0.95 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -100, scale: 0.85 },
};

const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.15, delay: 0.05 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
