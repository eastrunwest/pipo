'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedBookmarkedBg() {
  return (
    <div className="absolute inset-0">
      <motion.div
        className="absolute w-64 h-64 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full opacity-40 filter blur-3xl"
        animate={{ x: [0, 50, -50, 0], y: [0, -50, 50, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ top: '10%', left: '15%' }}
      />
      <motion.div
        className="absolute w-48 h-48 bg-gradient-to-tr from-blue-400 to-green-400 rounded-full opacity-40 filter blur-3xl"
        animate={{ x: [0, -40, 40, 0], y: [0, 40, -40, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{ bottom: '15%', right: '10%' }}
      />
      <motion.div
        className="absolute w-32 h-32 bg-gradient-to-tr from-yellow-400 to-red-400 rounded-full opacity-40 filter blur-2xl"
        animate={{ x: [0, 30, -30, 0], y: [0, -30, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ top: '50%', right: '20%' }}
      />
    </div>
  );
}
