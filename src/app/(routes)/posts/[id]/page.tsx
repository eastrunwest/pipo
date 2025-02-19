// SinglePostPage.tsx
import { getSinglePostData } from "@/actions";
import SinglePostContent from "@/components/SinglePostContent";

export default async function SinglePostPage({ params }: { params: { id: string } }) {
  const {
    post,
    authorProfile,
    comments,
    commentsAuthors,
    myLike,
    myBookmark,
    myAgree,
    myDisagree,
  } = await getSinglePostData(params.id);

  return (
    <div className="min-h-screen w-full p-1">
      <SinglePostContent
        post={post}
        authorProfile={authorProfile}
        comments={comments}
        commentsAuthors={commentsAuthors}
        myLike={myLike}
        myBookmark={myBookmark}
        myAgree={myAgree}
        myDisagree={myDisagree}
      />
    </div>
  );
}
