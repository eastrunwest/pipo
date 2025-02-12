"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SearchIcon } from "lucide-react";
import PostsGrid from "@/components/PostsGrid";
import MobileNav from "@/components/MobileNav";

// Enhanced animation variants for background elements
const backgroundVariants = {
  animate: {
    background: [
      "radial-gradient(circle at 0% 0%, rgba(56,189,248,0.15), transparent 50%)",
      "radial-gradient(circle at 100% 100%, rgba(139,92,246,0.15), transparent 50%)",
      "radial-gradient(circle at 0% 100%, rgba(56,189,248,0.15), transparent 50%)",
      "radial-gradient(circle at 100% 0%, rgba(139,92,246,0.15), transparent 50%)"
    ],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

const orbitingLightVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 30,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

const pulsingVariants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.3, 0.5, 0.3],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="relative min-h-screen"
      >
        {/* Enhanced background layers */}
        <div className="fixed inset-0 overflow-hidden">
          {/* Base gradient background */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-[#0a0a1b] via-[#16213e] to-[#0a0a1b]"
            style={{
              backgroundSize: '400% 400%',
              animation: 'gradientBG 15s ease infinite'
            }}
          />

          {/* Dynamic gradient overlay */}
          <motion.div
            variants={backgroundVariants}
            animate="animate"
            className="absolute inset-0"
          />

          {/* Animated orbital rings */}
          <motion.div
            variants={orbitingLightVariants}
            animate="animate"
            className="absolute inset-0"
          >
            <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2">
              <div className="absolute inset-0 border border-blue-500/10 rounded-full" 
                   style={{ transform: 'rotate(45deg)' }} />
              <div className="absolute inset-0 border border-purple-500/10 rounded-full" 
                   style={{ transform: 'rotate(-45deg)' }} />
            </div>
          </motion.div>

          {/* Animated light sources */}
          <motion.div
            variants={pulsingVariants}
            animate="animate"
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px]"
          >
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.1),transparent_70%)]" />
          </motion.div>

          <motion.div
            variants={pulsingVariants}
            animate="animate"
            className="absolute bottom-1/4 right-1/4 w-[800px] h-[800px]"
          >
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.1),transparent_70%)]" />
          </motion.div>

          {/* Mouse-following spotlight */}
          <motion.div
            animate={{
              x: mousePosition.x * 100,
              y: mousePosition.y * 100,
            }}
            className="absolute top-1/2 left-1/2 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          >
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.03),transparent_70%)]" />
          </motion.div>

          {/* Scanlines and noise effects */}
          <div className="absolute inset-0 bg-scanlines opacity-5" />
          <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-[0.02]" />

          {/* Grid overlay */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />

          {/* Blur overlay */}
          <div className="absolute inset-0 backdrop-blur-[100px]" />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/search")}
          className="fixed top-4 right-4 w-12 h-12 rounded-full z-50 group overflow-hidden flex items-center justify-center"
          style={{
            background: 'linear-gradient(to right, rgb(29, 78, 216), rgb(147, 51, 234))',
            backgroundSize: '200% 100%',
            animation: 'gradientMove 5s ease infinite'
          }}
        >
          <div className="relative flex items-center justify-center w-full h-full">
            {/* Gradient icon */}
            <SearchIcon className="w-5 h-5 text-white group-hover:text-blue-100 transition-colors duration-300" />
            
            {/* Button hover overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/10" />
            
            {/* Glow effect */}
            <div className="absolute -inset-1 opacity-0 group-hover:opacity-75 transition-opacity duration-300 blur-sm"
                 style={{
                   background: 'linear-gradient(to right, rgba(29, 78, 216, 0.5), rgba(147, 51, 234, 0.5))'
                 }} />
          </div>
        </motion.button>

        {/* Main content */}
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

        <div className="fixed bottom-0 left-0 right-0 z-20">
          <MobileNav />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// Enhanced loading spinner
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