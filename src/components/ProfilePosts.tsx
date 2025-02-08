'use client';

import PostsGrid from "@/components/PostsGrid";
import React, { useEffect, useState } from "react";
import { AnimatedPostsGrid } from "./AnimatedPostsGrid";

export default function ProfilePosts({ email }: { email: string }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`/api/posts/client?email=${email}`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, [email]);

  return (
    <AnimatedPostsGrid>
      <div className="w-full pb-16">
        <PostsGrid posts={posts} />
      </div>
    </AnimatedPostsGrid>
  );
  
}