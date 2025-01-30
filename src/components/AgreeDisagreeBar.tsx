import React from 'react';
import AgreeComponent from './Agree';
import DisagreeComponent from './Disagree';
import { Post, Agree, Disagree} from "@prisma/client";

export default function AgreeDisagreeBar({
  post,
  myAgree,
  myDisagree,
}: {
  post: Post;
  myAgree: Agree | null;
  myDisagree: Disagree | null;
}) {
  const totalVotes = post.agreeCount + post.disagreeCount;
  const agreePercentage = totalVotes ? (post.agreeCount / totalVotes) * 100 : 50;
  const disagreePercentage = totalVotes ? (post.disagreeCount / totalVotes) * 100 : 50;
  console.log('post.agreeCount :', post.agreeCount );
  console.log('post.disagreeCount :', post.disagreeCount );
  console.log('disagreePercentage:', disagreePercentage );
  return (
    <div className="w-full flex justify-center">
      <div className="w-11/12 flex items-center justify-between bg-gradient-to-r from-red-500 to-blue-500 rounded-lg overflow-hidden">
        <div className="flex-1 flex items-center justify-center bg-red-500" style={{ width: `${agreePercentage}%` }}>
          <AgreeComponent post={post} sessionAgree={myAgree} showText={false} />
          <span className="text-white ml-2">{post.agreeCount} 赞同 ({agreePercentage.toFixed(1)}%)</span>
        </div>
        <div className="px-4 text-white">VS</div>
        <div className="flex-1 flex items-center justify-center bg-blue-500" style={{ width: `${disagreePercentage}%` }}>
          <DisagreeComponent post={post} sessionDisagree={myDisagree} showText={false} />
          <span className="text-white ml-2">{post.disagreeCount} 反对 ({disagreePercentage.toFixed(1)}%)</span>
        </div>
      </div>
    </div>
  );
}