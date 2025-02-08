'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimatedProfileContentProps {
  children: ReactNode;
}

const AnimatedProfileContent = ({ children }: AnimatedProfileContentProps) => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden pb-20 md:pb-0"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            left: '20%',
            top: '10%'
          }}
        />
        <motion.div
          className="absolute w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            right: '20%',
            top: '20%'
          }}
        />
      </div>

      {/* Content with original components */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.main>
  );
};

export default AnimatedProfileContent;