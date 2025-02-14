'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function ProfileNav({
  isOurProfile = false,
  username,
}: {
  isOurProfile: boolean;
  username: string;
}) {
  const pathname = usePathname() ?? '';
  const bookmarkedActive = pathname.includes('bookmarked');
  const postsActive = !bookmarkedActive;

  const linkClass = (active: boolean) =>
    active
      ? "text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500"
      : "text-xl font-bold text-gray-500 hover:text-indigo-400 transition-colors";

  return (
    <section className="mt-4">
      <div className="flex justify-center gap-8">
        <Link className={linkClass(postsActive)} href="/profile">
          Posts
        </Link>
        {isOurProfile && (
          <Link className={linkClass(bookmarkedActive)} href="/profile/bookmarked">
            Bookmarked
          </Link>
        )}
      </div>
    </section>
  );
}
