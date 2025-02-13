'use client';
import React, { Suspense } from 'react';
import AnimatedProfileContent from './AnimatedProfileContent';
import ProfilePageInfo from './ProfilePageInfo';
import ProfileNav from './ProfileNav';
import ProfilePosts from './ProfilePosts';
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
            <ProfilePosts email={profile.email} />
          </Suspense>
        </section>
      </div>
    </AnimatedProfileContent>
  );
}
