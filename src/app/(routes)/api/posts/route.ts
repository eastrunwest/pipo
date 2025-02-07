import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  return NextResponse.json(posts);
}
