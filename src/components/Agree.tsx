'use client';
import { agreeEvent } from "@/actions";
import type {Agree,Post} from "@prisma/client";
import {HeartIcon} from "lucide-react";
import {useRouter} from "next/navigation";
import {useState} from "react";


export default function Agree({
  post,
  sessionAgree,
  showText=true,
}:{
  post:Post;
  sessionAgree:Agree|null;
  showText?:boolean;
}) {
  const router = useRouter();
  const [agreeByMe] = useState(!!sessionAgree);
  return (
    <form
      action={async (data:FormData) => {
        // if (!agreeByMe) {//close for test
            await agreeEvent(data);
        // }
        router.refresh();
      }}
      className="flex items-center gap-2">
      <input type="hidden" name="postId" value={post.id}/>
      <button
        type="submit"
        className="">
          <HeartIcon className={agreeByMe ? 'text-blue-500 fill-blue-500' : 'dark:text-white'}/>
      </button>
      {showText && (
        <p>{post.agreeCount} 赞同 </p>
      )}
    </form>
  );
}