'use client';
import { disagreeEvent } from "@/actions";
import type { Disagree, Post } from "@prisma/client";
import { HeartIcon, ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";


export default function Disagree({
  post,
  sessionDisagree,
  showText = true,
}: {
  post: Post;
  sessionDisagree: Disagree | null;
  showText?: boolean;
}) {
  const router = useRouter();
  const [disagreeByMe] = useState(!!sessionDisagree);
  const totalVotes = post.agreeCount + post.disagreeCount;
  const disagreePercentage = totalVotes ? (post.disagreeCount / totalVotes) * 100 : 50;
  return (
    <form
      action={async (data: FormData) => {
        // if (!disagreeByMe) {//close for test
        await disagreeEvent(data);
        // }
        router.refresh();
      }}
      className="flex items-center gap-2">
      <input type="hidden" name="postId" value={post.id} />
      <Button type="submit" variant="ghost" className="hover:text-red-400 transition-all duration-300">
        <ThumbsUp className={`w-6 h-6 ${disagreeByMe ? "text-red-500" : "text-gray-400"}`} />
        <span className="ml-0">{post.disagreeCount}</span>
        <span className="text-white ml-0"> ({disagreePercentage.toFixed(1)}%)</span>
      </Button>
    </form>
  );
}