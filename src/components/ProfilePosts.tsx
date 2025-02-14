'use client';
import React, { useEffect, useState } from 'react';
import { AnimatedPostsGrid } from './AnimatedPostsGrid';
import ProfilePostsDisplay from './ProfilePostsDisplay';

export default function ProfilePosts({ email }: { email: string }) {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/posts/client?email=${email}`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, [email]);

  return (
    <AnimatedPostsGrid>
      <div className="px-4">
        <ProfilePostsDisplay posts={posts} />
      </div>
    </AnimatedPostsGrid>
  );
}
