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
    <div className="min-h-screen w-full p-4">
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