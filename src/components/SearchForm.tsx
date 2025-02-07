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
      className="glassmorphism p-2 w-full max-w-md flex items-center justify-between space-x-2 transition-all duration-300 hover:shadow-lg"
    >
      <TextField.Root
        name="query"
        placeholder="Search for posts or users..."
        className="flex-grow bg-transparent text-white"
      >
        <TextField.Slot>
          <SearchIcon className="text-gray-400" />
        </TextField.Slot>
      </TextField.Root>
    </form>
  );
}
