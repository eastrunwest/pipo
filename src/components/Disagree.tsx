'use client';
import { disagreeEvent } from "@/actions";
import type {Disagree,Post} from "@prisma/client";
import {HeartIcon} from "lucide-react";
import {useRouter} from "next/navigation";
import {useState} from "react";


export default function Disagree({
  post,
  sessionDisagree,
  showText=true,
}:{
  post:Post;
  sessionDisagree:Disagree|null;
  showText?:boolean;
}) {
  const router = useRouter();
  const [disagreeByMe] = useState(!!sessionDisagree);
  return (
    <form
      action={async (data:FormData) => {
        if (!disagreeByMe) {
            await disagreeEvent(data);
        }
        router.refresh();
      }}
      className="flex items-center gap-2">
      <input type="hidden" name="postId" value={post.id}/>
      <button
        type="submit"
        className="">
        <HeartIcon className={disagreeByMe ? 'text-red-500 fill-red-500' : 'dark:text-white'}/>
      </button>
      {showText && (
        <p>{post.disagreeCount} 反对 </p>
      )}
    </form>
  );
}