"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PostsGrid from "@/components/PostsGrid";
import SearchForm from "@/components/SearchForm";
import MobileNav from "@/components/MobileNav";

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative min-h-screen px-4 md:px-8"
    >
      {/* Dynamic background effects */}
      <div className="fixed inset-0 overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1b] via-[#16213e] to-[#0a0a1b]" />
        
        {/* Animated orbs */}
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.1),transparent_70%)]"
        />
        <motion.div
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-1/4 right-1/4 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.1),transparent_70%)]"
        />
        
        {/* Overlay gradients */}
        <div className="absolute inset-0 backdrop-blur-[100px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-[2000px] mx-auto pt-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-4xl mb-12"
        >
          <SearchForm />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full px-4 mb-24"
        >
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-2 border-blue-500/30 border-t-blue-500 rounded-full"
              />
            </div>
          ) : (
            <PostsGrid posts={posts} />
          )}
        </motion.div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-20">
        <MobileNav />
      </div>
    </motion.div>
  );
}