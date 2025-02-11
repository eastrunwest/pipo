"use client";

import { Post } from "@prisma/client";
import Link from "next/link";
import Masonry from "react-masonry-css";
import { motion } from "framer-motion";

export default function PostsGrid({ posts = [] }: { posts?: Post[] }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center text-gray-400 py-10">
        <p>📭 暂无帖子</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Masonry
        breakpointCols={{ default: 4, 860: 2, 500: 1 }}
        className="flex -ml-4"
        columnClassName="pl-4"
      >
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <Link href={`/posts/${post.id}`} className="block mb-4">
              <div className="relative group overflow-hidden rounded-lg transition-all duration-300">
                {/* Hover glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-gradient-xy"></div>
                </div>
                
                {/* Image container with scanline effect */}
                <div className="relative overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    className="relative"
                  >
                    <img
                      className="rounded-lg w-full"
                      src={post.image}
                      alt={post.title || "Post image"}
                    />
                    {/* Scanline overlay */}
                    <div className="absolute inset-0 bg-scanline opacity-20 mix-blend-overlay pointer-events-none"></div>
                    
                    {/* Glitch effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 animate-glitch-1 bg-cyan-500/10"></div>
                      <div className="absolute inset-0 animate-glitch-2 bg-rose-500/10"></div>
                    </div>
                  </motion.div>
                </div>

                {/* Title with gradient background */}
                {post.title && (
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/70 to-transparent">
                    <motion.h5 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-gray-100/90 font-light tracking-wide text-sm"
                    >
                      {post.title}
                    </motion.h5>
                  </div>
                )}

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-0 right-0 w-full h-0.5 bg-gradient-to-l from-blue-500/50 to-transparent"></div>
                  <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-blue-500/50 to-transparent"></div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </Masonry>
    </div>
  );
}