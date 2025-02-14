'use client';
import React, { useEffect, useState } from 'react';
import { AnimatedPostsGrid } from './AnimatedPostsGrid';
import ProfilePostsDisplay from './ProfilePostsDisplay';

export default function BookmarkedPosts() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/bookmarks/client`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching bookmarked posts:", err));
  }, []);

  return (
    <AnimatedPostsGrid>
      <div className="px-4">
        <ProfilePostsDisplay posts={posts} />
      </div>
    </AnimatedPostsGrid>
  );
}
