import { prisma } from "@/db";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const userPosts = await prisma.post.findMany({
    where: { author: email },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return NextResponse.json(userPosts);
}
