import React, { Suspense } from 'react';
import BookmarkButton from "@/components/BookmarkButton";
import Comment from "@/components/Comment";
import LikesInfo from "@/components/LikesInfo";
import Preloader from "@/components/Preloader";
import SessionCommentForm from "@/components/SessionCommentForm";
import { Post, Profile, Comment as CommentModel, Like, Bookmark, Agree, Disagree } from "@prisma/client";
import { BookmarkIcon } from "lucide-react";
import EventDetail from "./EventDetail";
import ProbabilityChart from "./ProbabilityChart";
import EventDetailChart from './EventDetailChart';

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
    <div className="max-w-7xl mx-auto">
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <img
          className="rounded-md w-full"
          src={post.image}
          alt={post.description}
        />
      </div>
      <div className="flex flex-col">
        <EventDetailChart post={post} myAgree={myAgree} myDisagree={myDisagree}/>
        
        <div className="flex-grow">
          <div className="pt-4 flex flex-col gap-4">
            {comments.map(comment => (
              <div key={comment.id}>
                <Comment
                  createdAt={comment.createdAt}
                  text={comment.text}
                  authorProfile={commentsAuthors.find(a => a.email === comment.author)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="pt-8 mt-auto">
          <Suspense fallback={<Preloader />}>
            <SessionCommentForm postId={post.id} />
            <div className="flex items-center gap-2 mt-4">
              <LikesInfo post={post} sessionLike={myLike} />
              <BookmarkButton post={post} sessionBookmark={myBookmark} />
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  </div>
  );
}