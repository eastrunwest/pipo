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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative flex flex-col items-center p-8 min-h-screen" 
    >
      <div className="absolute inset-0 overflow-hidden z-0"> 
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e] to-[#16213e]"></div>
        <div className="absolute inset-0 before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,rgba(0,0,0,0.8)_80%)] before:animate-pulse"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl bg-black/50 backdrop-blur-md p-6 rounded-lg shadow-lg border border-gray-700 mb-24">
        <h1 className="text-center text-4xl font-bold text-white drop-shadow-lg mb-6">
          🔥 探索未来世界
        </h1>
        <SearchForm />
        
        {loading ? (
          <p className="text-gray-400 text-center">⏳ 正在加载...</p>
        ) : (
          <PostsGrid posts={posts} />
        )}
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <MobileNav />
      </div>
    </motion.div>
  );
}
