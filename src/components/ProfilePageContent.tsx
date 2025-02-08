'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Preloader from "@/components/Preloader";
import ProfileNav from "@/components/ProfileNav";
import ProfilePageInfo from "@/components/ProfilePageInfo";
import ProfilePosts from "@/components/ProfilePosts";
import {Follower, Profile} from "@prisma/client";
import {Suspense} from "react";
import AnimatedProfileContent from './AnimatedProfileContent';

export default function ProfilePageContent({
  profile,
  isOurProfile=false,
  ourFollow=null,
}:{
  profile:Profile;
  isOurProfile?:boolean;
  ourFollow:Follower|null;
}) {
  return (
    <AnimatedProfileContent>
      <div className="space-y-4">
        <ProfilePageInfo
          profile={profile}
          isOurProfile={isOurProfile}
          ourFollow={ourFollow}
        />
        <ProfileNav
          username={profile.username || ''}
          isOurProfile={isOurProfile}
        />
        <section className="mt-4">
          <Suspense fallback={<Preloader />}>
            <ProfilePosts email={profile.email} />
          </Suspense>
        </section>
      </div>
    </AnimatedProfileContent>
  );
}