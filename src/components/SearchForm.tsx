"use client";
import { TextField } from "@radix-ui/themes";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchForm() {
  const router = useRouter();

  return (
    <form
      action={async (data) => {
        router.push("/search?query=" + data.get("query"));
        router.refresh();
      }}
      className="mb-6 relative z-10 p-4 w-full flex items-center space-x-3 border border-transparent rounded-xl bg-black bg-opacity-40 backdrop-blur-md transition-all duration-500 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] animate-gradient-border"
    >
      <TextField.Root
        name="query"
        placeholder="Search for posts or users..."
        className="flex-grow bg-transparent text-white placeholder-white/70 focus:outline-none"
      >
        <TextField.Slot>
          <SearchIcon className="w-5 h-5 text-white/70" />
        </TextField.Slot>
      </TextField.Root>
    </form>
  );
}
