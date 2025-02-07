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
        breakpointCols={{ default: 4, 860: 3, 500: 2 }}
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
              <div className="relative group overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl">
                <img
                  className="rounded-lg group-hover:scale-105 transition-all duration-500"
                  src={post.image}
                  alt={post.title || "Post image"}
                />
                {post.title && (
                  <h5 className="absolute bottom-2 left-2 bg-black/50 text-white px-3 py-1 rounded-md">
                    {post.title}
                  </h5>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </Masonry>
    </div>
  );
}
