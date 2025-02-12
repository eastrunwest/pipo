"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SearchIcon } from "lucide-react";
import PostsGrid from "@/components/PostsGrid";
import MobileNav from "@/components/MobileNav";

// Animation variants
const pageTransition = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.02 }
};

const backgroundVariants = {
  animate: {
    background: [
      "radial-gradient(circle at 50% 50%, rgba(56,189,248,0.15), transparent 70%)",
      "radial-gradient(circle at 60% 60%, rgba(139,92,246,0.15), transparent 70%)",
      "radial-gradient(circle at 40% 40%, rgba(56,189,248,0.15), transparent 70%)"
    ],
    transition: {
      duration: 15,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  const goToSearchPage = () => {
    router.push("/search");
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        {...pageTransition}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative min-h-screen"
      >
        {/* Dynamic background layer */}
        <div className="fixed inset-0 overflow-hidden">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1b] via-[#16213e] to-[#0a0a1b]" />
          
          {/* Animated orbs */}
          <motion.div
            variants={backgroundVariants}
            animate="animate"
            className="absolute inset-0"
          />
          
          {/* Scanlines effect */}
          <div className="absolute inset-0 bg-scanlines opacity-5" />
          
          {/* Grid overlay */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
        </div>

        {/* Search button with hover effects */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={goToSearchPage}
          className="fixed top-4 right-4 p-4 bg-transparent backdrop-blur-md border border-white/10 rounded-full shadow-lg hover:shadow-blue-500/20 transition-all duration-300 z-50 group"
        >
          <SearchIcon className="w-6 h-6 text-white/80 group-hover:text-white" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>

        {/* Main content container */}
        <div className="relative z-10 container mx-auto px-4 pt-8">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full mb-24"
            >
              <PostsGrid posts={posts} />
            </motion.div>
          )}
        </div>

        {/* Mobile navigation */}
        <div className="fixed bottom-0 left-0 right-0 z-20">
          <MobileNav />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// Loading spinner component
function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-40">
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.2, 1],
          borderColor: [
            "rgb(59, 130, 246)",
            "rgb(147, 51, 234)",
            "rgb(59, 130, 246)"
          ]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "linear",
          times: [0, 0.5, 1]
        }}
        className="w-12 h-12 border-2 rounded-full"
        style={{ borderTopColor: 'transparent' }}
      />
    </div>
  );
}