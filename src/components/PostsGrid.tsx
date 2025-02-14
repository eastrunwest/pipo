"use client";

import { Post } from "@prisma/client";
import Link from "next/link";
import Masonry from "react-masonry-css";
import { motion } from "framer-motion";
import { useEffect } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function PostsGrid({ posts = [] }: { posts?: Post[] }) {

  useEffect(() => {
    setTimeout(() => window.dispatchEvent(new Event('resize')), 350);
  }, [posts]);

  if (!posts || posts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-10"
      >
        <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-light text-lg">
          📭 暂无帖子
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto"
    >
      <Masonry
        breakpointCols={{ default: 4, 1100: 3, 700: 2, 500: 1 }}
        className="flex -ml-4"
        columnClassName="pl-4"
      >
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            variants={itemVariants}
            className="mb-4"
          >
            <Link href={`/posts/${post.id}`}>
              <motion.div
                whileHover={{ y: -5 }}
                className="relative group rounded-xl overflow-hidden"
              >
                {/* Futuristic border effect */}
                <div className="absolute inset-0 p-[1px] rounded-xl bg-gradient-to-r from-transparent via-blue-500/50 to-purple-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Main content container */}
                <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden">
                  {/* Image with hover effects */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    className="relative aspect-[4/3] overflow-hidden"
                  >
                    <img
                      src={post.image}
                      alt={post.title || "Post image"}
                      className="object-cover w-full h-full transform transition-transform duration-300"
                    />
                    
                    {/* Hover overlay effects */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>

                  {/* Title section */}
                  {post.title && (
                    <motion.div
                      initial={false}
                      animate={{ height: 'auto' }}
                      className="relative p-4"
                    >
                      <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-light tracking-wide">
                        {post.title}
                      </h3>
                    </motion.div>
                  )}

                  {/* Interactive elements */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="p-2 rounded-full bg-white/10 backdrop-blur-md">
                      <motion.svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                        animate={{ rotate: [0, 180] }}
                        transition={{ duration: 0.6 }}
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </motion.svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </Masonry>
    </motion.div>
  );
}