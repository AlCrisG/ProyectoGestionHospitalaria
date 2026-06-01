import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { pageVariants, pageTransition } from '../../utils/animations';

export function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
}
