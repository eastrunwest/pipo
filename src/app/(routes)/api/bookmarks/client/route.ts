// app/api/bookmarks/client/route.ts
import { prisma } from "@/db";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const bookmarks = await prisma.bookmark.findMany({
    where: { author: email },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  const postIds = bookmarks.map(b => b.postId);
  const bookmarkedPosts = await prisma.post.findMany({
    where: { id: { in: postIds } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(bookmarkedPosts);
}