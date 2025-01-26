import React, { Suspense } from 'react';
import BookmarkButton from "@/components/BookmarkButton";
import Comment from "@/components/Comment";
import LikesInfo from "@/components/LikesInfo";
import Preloader from "@/components/Preloader";
import SessionCommentForm from "@/components/SessionCommentForm";
import { Post, Profile, Comment as CommentModel, Like, Bookmark } from "@prisma/client";
import { BookmarkIcon } from "lucide-react";
import EventDetail from "./EventDetail";
import ProbabilityChart from "./ProbabilityChart";
import EventDetailPieChart from './EventDetailPieChart';

export default function SinglePostContent({
  post,
  authorProfile,
  comments,
  commentsAuthors,
  myLike,
  myBookmark,
}: {
  post: Post;
  authorProfile: Profile;
  comments: CommentModel[];
  commentsAuthors: Profile[];
  myLike: Like | null;
  myBookmark: Bookmark | null;
}) {
  return (
    <div className="w-full h-full">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <img
            className="rounded-md"
            src={post.image} alt={post.description} />
        </div>
        <div>
          <EventDetail
            createdAt={post.createdAt} title={post.title}
            description={post.description} authorProfile={authorProfile} />
          <ProbabilityChart />
          <EventDetailPieChart />
          <div className="pt-4 flex flex-col gap-4">
            {comments.map(comment => (
              <div key={comment.id}>
                <Comment
                  createdAt={comment.createdAt}
                  text={comment.text}
                  authorProfile={commentsAuthors.find(a => a.email === comment.author)} />
              </div>
            ))}
          </div>
          <div className="pt-8 border-t border-gray-300 dark:border-gray-700">
            <Suspense fallback={<Preloader />}>
              <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-4 border-t border-gray-300 dark:border-gray-700 flex items-center justify-between">
                <SessionCommentForm postId={post.id} />
                <div className="flex items-center gap-2">
                  <LikesInfo post={post} sessionLike={myLike} />
                  <BookmarkButton post={post} sessionBookmark={myBookmark} />
                </div>
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}