'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Post {
  id: string;
  image: string;
  title?: string;
  content?: string;
}

interface ProfilePostsDisplayProps {
  posts?: Post[];
}

export default function ProfilePostsDisplay({ posts = [] }: ProfilePostsDisplayProps) {
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              transition={{ duration: 0.3 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg relative group"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title || 'Post image'} 
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
              </div>
              <div className="p-4">
                {post.title && (
                  <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
                    {post.title}
                  </h3>
                )}
                {post.content && (
                  <p className="mt-2 text-sm text-gray-300 line-clamp-3">
                    {post.content}
                  </p>
                )}
              </div>
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
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
