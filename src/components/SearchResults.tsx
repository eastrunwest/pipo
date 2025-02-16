import PostsGrid from "@/components/PostsGrid";
import { prisma } from "@/db";
import { Avatar } from "@radix-ui/themes";
import Link from "next/link";

export default async function SearchResults({ query }: { query: string }) {
  const profiles = await prisma.profile.findMany({
    where: {
      OR: [
        { username: { contains: query } },
        { name: { contains: query } },
      ],
    },
    take: 10,
  });
  const posts = await prisma.post.findMany({
    where: {
      description: { contains: query },
    },
    take: 100,
  });
  return (
    <div className="mt-6 animate-fadeIn">
      <h1 className="text-2xl font-bold text-white mb-4">
        Search results for{" "}
        <span className="text-gradient">{`"${query}"`}</span>
      </h1>
      {profiles?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {profiles.map((profile) => (
            <Link
              key={profile.username}
              href={`/users/${profile.username}`}
              className="flex items-center gap-4 p-4 rounded-xl bg-black bg-opacity-40 border border-transparent transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_10px_rgba(255,255,255,0.5)] animate-gradient-border"
            >
              <div>
                <Avatar
                  size="5"
                  radius="full"
                  fallback="user avatar"
                  src={profile.avatar || ""}
                />
              </div>
              <div>
                <h3 className="text-lg text-white">{profile.name}</h3>
                <h4 className="text-sm text-white/70">@{profile.username}</h4>
              </div>
            </Link>
          ))}
        </div>
      )}
      <div>
        <PostsGrid posts={posts} />
      </div>
    </div>
  );
}
