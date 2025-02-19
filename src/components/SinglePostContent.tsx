// SinglePostContent.tsx
import React, { Suspense } from 'react';
import BookmarkButton from "@/components/BookmarkButton";
import Comment from "@/components/Comment";
import LikesInfo from "@/components/LikesInfo";
import Preloader from "@/components/Preloader";
import SessionCommentForm from "@/components/SessionCommentForm";
import { Post, Profile, Comment as CommentModel, Like, Bookmark, Agree, Disagree } from "@prisma/client";
import EventDetailChart from "./EventDetailChart";

export default function SinglePostContent({
  post,
  authorProfile,
  comments,
  commentsAuthors,
  myLike,
  myBookmark,
  myAgree,
  myDisagree,
}: {
  post: Post;
  authorProfile: Profile;
  comments: CommentModel[];
  commentsAuthors: Profile[];
  myLike: Like | null;
  myBookmark: Bookmark | null;
  myAgree: Agree | null;
  myDisagree: Disagree | null;
}) {
  return (
    <div className="max-w-full mx-auto bg-black/70 backdrop-blur-md rounded-xl shadow-lg p-4 space-y-6">
      <div>
        <img
          className="w-full h-auto rounded-md"
          src={post.image}
          alt={post.description}
        />
      </div>
     
      <div className="w-full">
        <EventDetailChart post={post} myAgree={myAgree} myDisagree={myDisagree} />
      </div>
      <div className="px-2 space-y-4">
        {comments.map(comment => (
          <Comment
            key={comment.id}
            createdAt={comment.createdAt}
            text={comment.text}
            authorProfile={commentsAuthors.find(a => a.email === comment.author)}
          />
        ))}
      </div>
      <div className="px-2 space-y-4">
        <Suspense fallback={<Preloader />}>
          <SessionCommentForm postId={post.id} />
          <div className="flex items-center gap-4">
            <LikesInfo post={post} sessionLike={myLike} />
            <BookmarkButton post={post} sessionBookmark={myBookmark} />
          </div>
        </Suspense>
      </div>
    </div>
  );
}
