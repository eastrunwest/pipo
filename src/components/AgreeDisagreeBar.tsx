import React from 'react';
import AgreeComponent from './Agree';
import DisagreeComponent from './Disagree';
import { Post, Agree, Disagree } from "@prisma/client";

export default function AgreeDisagreeBar({
  post,
  myAgree,
  myDisagree,
}: {
  post: Post;
  myAgree: Agree | null;
  myDisagree: Disagree | null;
}) {
  const agreeCount = post.agreeCount || 0;
  const disagreeCount = post.disagreeCount || 0;
  const total = agreeCount + disagreeCount;

//   const agreePercentage = total > 0 ? (agreeCount / total) * 100 : 50;
//   const disagreePercentage = total > 0 ? (disagreeCount / total) * 100 : 50;
  const agreePercentage = 50;
  const disagreePercentage = 50;

  return (
    <div className="w-full flex justify-center px-2">
      <div className="w-full max-w-screen-lg flex relative rounded-lg overflow-hidden">
        <div className="flex items-center justify-center bg-red-500 transition-all duration-300" style={{ width: `${agreePercentage}%` }}>
          <AgreeComponent post={post} sessionAgree={myAgree} showText={false} />
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-white font-bold text-lg select-none">VS</span>
        </div>

        <div className="flex items-center justify-center bg-blue-500 transition-all duration-300" style={{ width: `${disagreePercentage}%` }}>
          <DisagreeComponent post={post} sessionDisagree={myDisagree} showText={false} />
        </div>
      </div>
    </div>
  );
}
