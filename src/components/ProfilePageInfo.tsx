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
      <section className="flex justify-end items-center">
        {isOurProfile && (
          <Link
            href="/settings"
            className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 transition-all shadow-lg"
          >
            <CogIcon size={24} className="text-white" />
          </Link>
        )}
      </section>
      <section className="flex justify-center">
        <div className="relative">
          <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-indigo-500 to-purple-500">
            <div className="w-full h-full rounded-full bg-black overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={profile.avatar || '/default-avatar.png'}
                alt="Profile Avatar"
              />
            </div>
          </div>
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
