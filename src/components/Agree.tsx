'use client';
import { agreeEvent } from "@/actions";
import type { Agree, Post } from "@prisma/client";
import { HeartIcon, ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";


export default function Agree({
  post,
  sessionAgree,
  showText = true,
}: {
  post: Post;
  sessionAgree: Agree | null;
  showText?: boolean;
}) {
  const router = useRouter();
  const [agreeByMe] = useState(!!sessionAgree);
  const totalVotes = post.agreeCount + post.disagreeCount;
  const agreePercentage = totalVotes ? (post.agreeCount / totalVotes) * 100 : 50;
  return (
    <form
      action={async (data: FormData) => {
        // if (!agreeByMe) {//close for test
        await agreeEvent(data);
        // }
        router.refresh();
      }}
      className="flex items-center gap-2">
      <input type="hidden" name="postId" value={post.id} />

      <Button type="submit" variant="ghost" className="hover:text-green-400 transition-all duration-300">
        <ThumbsUp className={`w-6 h-6 ${agreeByMe ? "text-green-500" : "text-gray-400"}`} />
        <span className="ml-0">{post.agreeCount}</span>
        <span className="text-white ml-0">({agreePercentage.toFixed(1)}%)</span>
      </Button>
    </form>
  );
}