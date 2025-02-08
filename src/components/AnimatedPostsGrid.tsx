'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimatedPostsGridProps {
  children: ReactNode;
}

export const AnimatedPostsGrid = ({ children }: AnimatedPostsGridProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};
