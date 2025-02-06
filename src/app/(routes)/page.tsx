import { auth, signIn, signOut } from "@/auth";
import Preloader from "@/components/Preloader";
import UserHome from "@/components/UserHome";
import PostsGrid from "@/components/PostsGrid";
import { prisma } from "@/db";
import SearchForm from "@/components/SearchForm";
import SearchResults from "@/components/SearchResults";
import { Suspense } from "react";

export default async function Home({
  searchParams: { query },
}: {
  searchParams: { query: string },
}) {
  const session = await auth();
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  });
  return (
    <div className="w-full">
      <div className="w-full">
        <div className="max-w-md mx-auto fixed top-0 left-0 right-0 z-10 p-4">
          <SearchForm />
        </div>
        {typeof query !== 'undefined' && (
          <Suspense fallback={<Preloader />}>
            <SearchResults query={query} />
          </Suspense>
        )}
      </div>
      <div className="mt-12">
        <PostsGrid posts={posts} />
      </div>
    </div>
  );
}
