import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0.5,
    x: 100,
  },
  in: {
    opacity: 1,
    x: 0,
  },
};

const AnimatedPage = ({ children }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    className="flex column"
    style={{ height: '100%', flex: 1 }}
  >
      {children}
  </motion.div>
);

export default AnimatedPage;
