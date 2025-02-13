import FollowButton from "@/components/FollowButton";
import { Follower, Profile } from "@prisma/client";
import { CheckIcon, ChevronLeft, CogIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ProfilePageInfo({
  profile,
  isOurProfile,
  ourFollow,
}: {
  profile: Profile;
  isOurProfile: boolean;
  ourFollow: Follower | null;
}) {
  return (
    <div className="space-y-6">
      <section className="flex justify-between items-center">
        <button className="p-2 hover:text-indigo-400 transition-colors">
          <ChevronLeft size={24} />
        </button>
        <div className="flex items-center gap-2 text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
          {profile.username}
          <div className="p-1 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500">
            <CheckIcon size={16} />
          </div>
        </div>
        <div>
          {isOurProfile && (
            <Link href="/settings" className="p-2 hover:text-indigo-400 transition-colors">
              <CogIcon size={24} />
            </Link>
          )}
        </div>
      </section>
      <section className="flex justify-center">
        <div className="relative">
          <div className="w-40 h-40 rounded-full p-1 bg-gradient-to-tr from-indigo-500 to-purple-500">
            <div className="w-full h-full rounded-full bg-black overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={profile.avatar || '/default-avatar.png'}
                alt="Profile Avatar"
              />
            </div>
          </div>
          {/* 动态发光边框效果 */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 opacity-75 animate-pulse"></div>
        </div>
      </section>
      <section className="text-center">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
          {profile.name}
        </h1>
        <p className="text-lg text-gray-300">{profile.subtitle}</p>
        <p className="mt-2 text-base text-gray-400">{profile.bio}</p>
      </section>
      {!isOurProfile && (
        <section className="flex justify-center">
          <FollowButton ourFollow={ourFollow} profileIdToFollow={profile.id} />
        </section>
      )}
    </div>
  );
}
