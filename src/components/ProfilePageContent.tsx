'use client';
import React, { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import AnimatedProfileContent from './AnimatedProfileContent';
import ProfilePageInfo from './ProfilePageInfo';
import ProfileNav from './ProfileNav';
import ProfilePosts from './ProfilePosts';
import BookmarkedPosts from './BookmarkedPosts';
import Preloader from "@/components/Preloader";
import { Profile, Follower } from "@prisma/client";

interface ProfilePageContentProps {
  profile: Profile;
  isOurProfile?: boolean;
  ourFollow?: Follower | null;
}

export default function ProfilePageContent({
  profile,
  isOurProfile = false,
  ourFollow = null,
}: ProfilePageContentProps) {

  const pathname = usePathname() ?? '';
  const bookmarkedActive = pathname.includes('bookmarked');

  return (
    <AnimatedProfileContent>
      <div className="space-y-6 p-4">
        <ProfilePageInfo
          profile={profile}
          isOurProfile={isOurProfile}
          ourFollow={ourFollow}
        />
        <ProfileNav isOurProfile={isOurProfile} username={profile.username || ''} />
        <section className="mt-6">
          <Suspense fallback={<Preloader />}>
            {bookmarkedActive ? (
              <BookmarkedPosts />
            ) : (
              <ProfilePosts email={profile.email} />
            )}
          </Suspense>
        </section>
      </div>
    </AnimatedProfileContent>
  );
}
