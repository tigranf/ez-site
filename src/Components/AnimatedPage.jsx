import { Box } from "@mui/material";
import { motion } from "framer-motion";

const animations = {
  initial: { opacity: 0, x: 100, scale: 0.95, rotate: 2 },
  animate: { opacity: 1, x: 0, scale: 1, rotate: 0 },
  exit: { opacity: 0, x: -100, scale: 0.85, rotate: -2 },
};

const AnimatedPage = ({ children }) => {
  return (
    <Box sx={{overflowX: 'hidden'}}>
      <motion.div
        variants={animations}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.15, delay: 0.05 }}
      >
        {children}
      </motion.div>
    </Box>
  );
};

export default AnimatedPage;
