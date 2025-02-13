import { auth } from "@/auth";
import AnimatedBookmarkedBg from "@/components/AnimatedBookmarkedBg";
import PostsGrid from "@/components/PostsGrid";
import ProfileNav from "@/components/ProfileNav";
import ProfilePageInfo from "@/components/ProfilePageInfo";
import { prisma } from "@/db";
import { redirect } from "next/navigation";

export default async function BookmarkedPage() {
  const session = await auth();
  if (!session) {
    return redirect('/login');
  }

  const profile = await prisma.profile.findFirst({
    where: { email: session?.user?.email as string },
  });
  if (!profile) {
    return redirect('/settings');
  }

  const bookmarks = await prisma.bookmark.findMany({
    where: { author: session?.user?.email as string },
  });
  const posts = await prisma.post.findMany({
    where: { id: { in: bookmarks.map(b => b.postId) } },
  });

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
      <AnimatedBookmarkedBg />
      <div className="relative z-10 p-4">
        <ProfilePageInfo profile={profile} isOurProfile={true} ourFollow={null} />
        <ProfileNav isOurProfile={true} username={profile.username || ''} />
        <div className="mt-6 mb-20 px-4">
          <PostsGrid posts={posts} />
        </div>
      </div>
    </div>
  );
}
